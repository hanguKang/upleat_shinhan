import { css } from '@emotion/react';
import { useState } from 'react';
import { SearchFilter } from '../../types/search';

interface SearchFiltersProps {
  filters: SearchFilter;
  onFiltersChange: (filters: SearchFilter) => void;
  onApply: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onApply
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const containerStyle = css`
    background: #F8F9FA;
    border: 1px solid #E1E6EC;
    border-radius: 8px;
    margin-bottom: 20px;
  `;

  const headerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &:hover {
      background-color: #F0F2F5;
    }
  `;

  const titleStyle = css`
    font-weight: 600;
    color: #333;
    display: flex;
    align-items: center;
    gap: 8px;
  `;

  const toggleIconStyle = css`
    transform: ${isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.2s ease;
  `;

  const contentStyle = css`
    display: ${isExpanded ? 'block' : 'none'};
    padding: 0 20px 20px;
    border-top: 1px solid #E1E6EC;
  `;

  const filterGroupStyle = css`
    margin-bottom: 20px;
    
    &:last-child {
      margin-bottom: 0;
    }
  `;

  const filterLabelStyle = css`
    display: block;
    font-weight: 600;
    margin-bottom: 8px;
    color: #333;
    font-size: 14px;
  `;

  const checkboxGroupStyle = css`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    
    @media (max-width: 640px) {
      flex-direction: column;
      gap: 8px;
    }
  `;

  const checkboxItemStyle = css`
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    
    input[type="checkbox"] {
      margin: 0;
      accent-color: #15213D;
    }
    
    label {
      cursor: pointer;
      font-size: 14px;
      color: #333;
    }
  `;

  const dateRangeStyle = css`
    display: flex;
    gap: 12px;
    align-items: center;
    
    @media (max-width: 640px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }
  `;

  const dateInputStyle = css`
    padding: 8px 12px;
    border: 1px solid #E1E6EC;
    border-radius: 4px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #15213D;
    }
  `;

  const buttonGroupStyle = css`
    display: flex;
    gap: 12px;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #E1E6EC;
  `;

  const buttonStyle = css`
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  `;

  const primaryButtonStyle = css`
    ${buttonStyle}
    background-color: #15213D;
    color: white;
    border: 1px solid #15213D;
    
    &:hover {
      background-color: #0d1628;
    }
  `;

  const secondaryButtonStyle = css`
    ${buttonStyle}
    background-color: white;
    color: #15213D;
    border: 1px solid #E1E6EC;
    
    &:hover {
      background-color: #F8F9FA;
    }
  `;

  const typeOptions = [
    { value: 'mail', label: '메일' },
    { value: 'document', label: '문서' },
    { value: 'contact', label: '연락처' },
    { value: 'calendar', label: '일정' },
    { value: 'board', label: '게시판' }
  ];

  const departmentOptions = [
    { value: '경영기획팀', label: '경영기획팀' },
    { value: 'IT팀', label: 'IT팀' },
    { value: '인사팀', label: '인사팀' },
    { value: '재무팀', label: '재무팀' },
    { value: '마케팅팀', label: '마케팅팀' },
    { value: '영업팀', label: '영업팀' }
  ];

  const handleTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.type || [];
    const newTypes = checked
      ? [...currentTypes, type as any]
      : currentTypes.filter(t => t !== type);
    
    onFiltersChange({
      ...filters,
      type: newTypes.length > 0 ? newTypes : undefined
    });
  };

  const handleDepartmentChange = (department: string, checked: boolean) => {
    const currentDepts = filters.department || [];
    const newDepts = checked
      ? [...currentDepts, department]
      : currentDepts.filter(d => d !== department);
    
    onFiltersChange({
      ...filters,
      department: newDepts.length > 0 ? newDepts : undefined
    });
  };

  const handleClearFilters = () => {
    onFiltersChange({});
  };

  const chevronIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42z"/>
  </svg>`;

  const filterIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
  </svg>`;

  return (
    <div css={containerStyle}>
      <div css={headerStyle} onClick={() => setIsExpanded(!isExpanded)}>
        <div css={titleStyle}>
          <span dangerouslySetInnerHTML={{ __html: filterIcon }} />
          검색 필터
        </div>
        <div css={toggleIconStyle} dangerouslySetInnerHTML={{ __html: chevronIcon }} />
      </div>

      <div css={contentStyle}>
        <div css={filterGroupStyle}>
          <label css={filterLabelStyle}>콘텐츠 유형</label>
          <div css={checkboxGroupStyle}>
            {typeOptions.map(option => (
              <div key={option.value} css={checkboxItemStyle}>
                <input
                  type="checkbox"
                  id={`type-${option.value}`}
                  checked={filters.type?.includes(option.value as any) || false}
                  onChange={(e) => handleTypeChange(option.value, e.target.checked)}
                />
                <label htmlFor={`type-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div css={filterGroupStyle}>
          <label css={filterLabelStyle}>부서</label>
          <div css={checkboxGroupStyle}>
            {departmentOptions.map(option => (
              <div key={option.value} css={checkboxItemStyle}>
                <input
                  type="checkbox"
                  id={`dept-${option.value}`}
                  checked={filters.department?.includes(option.value) || false}
                  onChange={(e) => handleDepartmentChange(option.value, e.target.checked)}
                />
                <label htmlFor={`dept-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div css={filterGroupStyle}>
          <label css={filterLabelStyle}>날짜 범위</label>
          <div css={dateRangeStyle}>
            <input
              type="date"
              css={dateInputStyle}
              placeholder="시작일"
            />
            <span>~</span>
            <input
              type="date"
              css={dateInputStyle}
              placeholder="종료일"
            />
          </div>
        </div>

        <div css={buttonGroupStyle}>
          <button css={primaryButtonStyle} onClick={onApply}>
            필터 적용
          </button>
          <button css={secondaryButtonStyle} onClick={handleClearFilters}>
            초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
