export interface SearchResult {
  id: string;
  type: 'mail' | 'document' | 'contact' | 'calendar' | 'board';
  title: string;
  content: string;
  author?: string;
  date?: string;
  department?: string;
  tags?: string[];
  url?: string;
  relevance: number;
}

export interface SearchFilter {
  type?: SearchResult['type'][];
  dateRange?: {
    start: Date;
    end: Date;
  };
  department?: string[];
  author?: string[];
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  filters: SearchFilter;
  isLoading: boolean;
  hasSearched: boolean;
  totalResults: number;
  suggestions: string[];
}

export interface SearchProps {
  onSearch: (query: string, filters?: SearchFilter) => void;
  onClear: () => void;
  placeholder?: string;
  showFilters?: boolean;
}
