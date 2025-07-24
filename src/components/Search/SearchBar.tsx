import { css } from '@emotion/react';
import { useState, useRef, useEffect } from 'react';
import { SearchProps } from '../../types/search';

const SearchBar: React.FC<SearchProps> = ({ 
  onSearch, 
  onClear, 
  placeholder = "통합 검색...",
  showFilters = false 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const containerStyle = css`
    position: relative;
    width: 100%;
    max-width: 600px;
  `;

  const searchInputStyle = css`
    width: 100%;
    height: 48px;
    padding: 12px 20px 12px 52px;
    border: 2px solid #E1E6EC;
    border-radius: 24px;
    font-size: 16px;
    font-family: 'Pretendard', sans-serif;
    background-color: #FFF;
    transition: all 0.3s ease;
    outline: none;
    
    &:focus {
      border-color: #15213D;
      box-shadow: 0 0 0 3px rgba(21, 33, 61, 0.1);
    }
    
    &::placeholder {
      color: #999;
    }
    
    @media (max-width: 640px) {
      height: 44px;
      padding: 10px 18px 10px 48px;
      font-size: 14px;
    }
  `;

  const searchIconStyle = css`
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    color: #727E88;
    pointer-events: none;
    
    @media (max-width: 640px) {
      left: 16px;
      width: 18px;
      height: 18px;
    }
  `;

  const clearButtonStyle = css`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #727E88;
    color: white;
    border: none;
    cursor: pointer;
    display: ${query ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: #15213D;
    }
  `;

  const suggestionsStyle = css`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #E1E6EC;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    margin-top: 4px;
    display: ${showSuggestions && isFocused ? 'block' : 'none'};
  `;

  const suggestionItemStyle = css`
    padding: 12px 20px;
    cursor: pointer;
    border-bottom: 1px solid #F5F7FA;
    font-size: 14px;
    color: #333;
    
    &:hover {
      background-color: #F5F7FA;
    }
    
    &:last-child {
      border-bottom: none;
    }
  `;

  const quickSearchStyle = css`
    padding: 8px 20px;
    background-color: #F8F9FA;
    font-size: 12px;
    color: #727E88;
    border-bottom: 1px solid #E1E6EC;
  `;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
    onClear();
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const quickSearches = ['메일', '문서', '연락처', '일정', '공지사항'];

  const searchIcon = `<svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>`;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div css={containerStyle}>
      <form onSubmit={handleSubmit}>
        <div css={searchIconStyle} dangerouslySetInnerHTML={{ __html: searchIcon }} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowSuggestions(true);
          }}
          placeholder={placeholder}
          css={searchInputStyle}
        />
        <button
          type="button"
          onClick={handleClear}
          css={clearButtonStyle}
          aria-label="검색어 지우기"
        >
          ×
        </button>
      </form>

      <div css={suggestionsStyle}>
        <div css={quickSearchStyle}>빠른 검색</div>
        {quickSearches.map((item, index) => (
          <div
            key={index}
            css={suggestionItemStyle}
            onClick={() => handleSuggestionClick(item)}
          >
            🔍 {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
