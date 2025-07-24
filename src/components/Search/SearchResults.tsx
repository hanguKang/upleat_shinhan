import { css } from '@emotion/react';
import { SearchResult } from '../../types/search';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  totalResults: number;
  isLoading: boolean;
  hasSearched: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  totalResults,
  isLoading,
  hasSearched
}) => {
  const containerStyle = css`
    padding: 20px 0;
  `;

  const headerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #E1E6EC;
  `;

  const resultCountStyle = css`
    font-size: 14px;
    color: #727E88;
  `;

  const queryStyle = css`
    font-weight: 600;
    color: #15213D;
  `;

  const loadingStyle = css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;
    color: #727E88;
  `;

  const noResultsStyle = css`
    text-align: center;
    padding: 40px 20px;
    color: #727E88;
    
    h3 {
      margin-bottom: 8px;
      color: #333;
    }
  `;

  const resultItemStyle = css`
    background: white;
    border: 1px solid #E1E6EC;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 16px;
    transition: all 0.2s ease;
    cursor: pointer;
    
    &:hover {
      border-color: #15213D;
      box-shadow: 0 2px 8px rgba(21, 33, 61, 0.1);
    }
  `;

  const resultHeaderStyle = css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  `;

  const typeTagStyle = css`
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
  `;

  const titleStyle = css`
    font-size: 18px;
    font-weight: 600;
    color: #15213D;
    margin-bottom: 8px;
    line-height: 1.4;
  `;

  const contentStyle = css`
    color: #666;
    line-height: 1.5;
    margin-bottom: 12px;
  `;

  const metaStyle = css`
    display: flex;
    gap: 16px;
    font-size: 12px;
    color: #727E88;
    
    @media (max-width: 640px) {
      flex-direction: column;
      gap: 4px;
    }
  `;

  const getTypeColor = (type: SearchResult['type']) => {
    const colors = {
      mail: { bg: '#E3F2FD', text: '#1976D2' },
      document: { bg: '#F3E5F5', text: '#7B1FA2' },
      contact: { bg: '#E8F5E8', text: '#388E3C' },
      calendar: { bg: '#FFF3E0', text: '#F57C00' },
      board: { bg: '#FCE4EC', text: '#C2185B' }
    };
    return colors[type];
  };

  const getTypeLabel = (type: SearchResult['type']) => {
    const labels = {
      mail: '메일',
      document: '문서',
      contact: '연락처',
      calendar: '일정',
      board: '게시판'
    };
    return labels[type];
  };

  const highlightQuery = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background-color: #FFF59D; padding: 0 2px;">$1</mark>');
  };

  const spinnerStyle = css`
    width: 24px;
    height: 24px;
    border: 2px solid #E1E6EC;
    border-top: 2px solid #15213D;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  if (isLoading) {
    return (
      <div css={loadingStyle}>
        <div css={spinnerStyle}></div>
        <span style={{ marginLeft: '12px' }}>검색 중...</span>
      </div>
    );
  }

  if (!hasSearched) {
    return null;
  }

  if (results.length === 0) {
    return (
      <div css={noResultsStyle}>
        <h3>검색 결과가 없습니다</h3>
        <p><span css={queryStyle}>"{query}"</span>에 대한 검색 결과를 찾을 수 없습니다.</p>
        <p style={{ marginTop: '12px', fontSize: '14px' }}>
          • 검색어를 다시 확인해 주세요<br/>
          • 다른 검색어를 시도해 보세요<br/>
          • 필터 조건을 조정해 보세요
        </p>
      </div>
    );
  }

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <div css={resultCountStyle}>
          <span css={queryStyle}>"{query}"</span>에 대한 검색 결과 {totalResults}건
        </div>
      </div>

      {results.map((result) => {
        const typeColor = getTypeColor(result.type);
        return (
          <div key={result.id} css={resultItemStyle}>
            <div css={resultHeaderStyle}>
              <span
                css={[typeTagStyle, css`
                  background-color: ${typeColor.bg};
                  color: ${typeColor.text};
                `]}
              >
                {getTypeLabel(result.type)}
              </span>
            </div>
            
            <h3 
              css={titleStyle}
              dangerouslySetInnerHTML={{ 
                __html: highlightQuery(result.title, query) 
              }}
            />
            
            <p 
              css={contentStyle}
              dangerouslySetInnerHTML={{ 
                __html: highlightQuery(result.content, query) 
              }}
            />
            
            <div css={metaStyle}>
              {result.author && <span>👤 {result.author}</span>}
              {result.department && <span>🏢 {result.department}</span>}
              {result.date && <span>📅 {result.date}</span>}
              {result.tags && result.tags.length > 0 && (
                <span>🏷️ {result.tags.join(', ')}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
