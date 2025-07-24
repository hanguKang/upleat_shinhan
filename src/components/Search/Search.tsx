import { css } from '@emotion/react';
import { useSearch } from '../../hooks/useSearch';
import SearchBar from './SearchBar';
import SearchFilters from './SearchFilters';
import SearchResults from './SearchResults';

const Search: React.FC = () => {
  const { searchState, search, clearSearch } = useSearch();

  const containerStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    
    @media (max-width: 640px) {
      padding: 16px;
    }
  `;

  const headerStyle = css`
    text-align: center;
    margin-bottom: 40px;
    
    @media (max-width: 640px) {
      margin-bottom: 24px;
    }
  `;

  const titleStyle = css`
    font-size: 32px;
    font-weight: 700;
    color: #15213D;
    margin-bottom: 12px;
    
    @media (max-width: 640px) {
      font-size: 24px;
    }
  `;

  const subtitleStyle = css`
    font-size: 16px;
    color: #727E88;
    margin-bottom: 32px;
    
    @media (max-width: 640px) {
      font-size: 14px;
      margin-bottom: 24px;
    }
  `;

  const searchSectionStyle = css`
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
    
    @media (max-width: 640px) {
      margin-bottom: 24px;
    }
  `;

  const contentStyle = css`
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 32px;
    align-items: start;
    
    @media (max-width: 991px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  `;

  const filtersStyle = css`
    @media (max-width: 991px) {
      order: 2;
    }
  `;

  const resultsStyle = css`
    @media (max-width: 991px) {
      order: 1;
    }
  `;

  const quickStatsStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-bottom: 32px;
    
    @media (max-width: 640px) {
      grid-template-columns: 1fr;
      margin-bottom: 24px;
    }
  `;

  const statCardStyle = css`
    background: linear-gradient(135deg, #15213D 0%, #1e2b4a 100%);
    color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    
    @media (max-width: 640px) {
      padding: 16px;
    }
  `;

  const statNumberStyle = css`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 4px;
    
    @media (max-width: 640px) {
      font-size: 24px;
    }
  `;

  const statLabelStyle = css`
    font-size: 14px;
    opacity: 0.9;
  `;

  const handleSearch = (query: string, filters = searchState.filters) => {
    search(query, filters);
  };

  const handleFiltersChange = (filters: any) => {
    // If there's an active search, re-search with new filters
    if (searchState.query) {
      search(searchState.query, filters);
    }
  };

  const handleApplyFilters = () => {
    if (searchState.query) {
      search(searchState.query, searchState.filters);
    }
  };

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <h1 css={titleStyle}>통합 검색</h1>
        <p css={subtitleStyle}>
          메일, 문서, 연락처, 일정, 게시판을 한 번에 검색하세요
        </p>
      </div>

      <div css={searchSectionStyle}>
        <SearchBar 
          onSearch={handleSearch}
          onClear={clearSearch}
          placeholder="검색어를 입력하세요..."
          showFilters={true}
        />
      </div>

      {!searchState.hasSearched && (
        <div css={quickStatsStyle}>
          <div css={statCardStyle}>
            <div css={statNumberStyle}>1,247</div>
            <div css={statLabelStyle}>전체 메일</div>
          </div>
          <div css={statCardStyle}>
            <div css={statNumberStyle}>523</div>
            <div css={statLabelStyle}>문서</div>
          </div>
          <div css={statCardStyle}>
            <div css={statNumberStyle}>89</div>
            <div css={statLabelStyle}>연락처</div>
          </div>
          <div css={statCardStyle}>
            <div css={statNumberStyle}>156</div>
            <div css={statLabelStyle}>일정</div>
          </div>
        </div>
      )}

      {searchState.hasSearched && (
        <div css={contentStyle}>
          <div css={filtersStyle}>
            <SearchFilters
              filters={searchState.filters}
              onFiltersChange={handleFiltersChange}
              onApply={handleApplyFilters}
            />
          </div>
          
          <div css={resultsStyle}>
            <SearchResults
              results={searchState.results}
              query={searchState.query}
              totalResults={searchState.totalResults}
              isLoading={searchState.isLoading}
              hasSearched={searchState.hasSearched}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
