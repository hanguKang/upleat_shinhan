import { useState, useCallback, useEffect } from 'react';
import { SearchResult, SearchFilter, SearchState } from '../types/search';

// Mock data for demonstration
const mockResults: SearchResult[] = [
  {
    id: '1',
    type: 'mail',
    title: '2024년 1분기 실적 보고서',
    content: '안녕하세요. 2024년 1분기 실적 보고서를 첨부하여 보내드립니다.',
    author: '김철수',
    date: '2024-01-15',
    department: '경영기획팀',
    relevance: 0.95
  },
  {
    id: '2',
    type: 'document',
    title: '신규 시스템 도입 계획서',
    content: '디지털 전환을 위한 새로운 ERP 시스템 도입 계획안입니다.',
    author: '이영희',
    date: '2024-01-10',
    department: 'IT팀',
    tags: ['ERP', '시스템', '계획'],
    relevance: 0.87
  },
  {
    id: '3',
    type: 'contact',
    title: '박민수 (IT팀 팀장)',
    content: '연락처: 02-1234-5678, 이메일: park@company.com',
    department: 'IT팀',
    relevance: 0.75
  },
  {
    id: '4',
    type: 'calendar',
    title: '임원진 회의',
    content: '2024년 2분기 전략 수립을 위한 임원진 회의',
    date: '2024-01-20',
    relevance: 0.82
  },
  {
    id: '5',
    type: 'board',
    title: '신입사원 환영회 공지',
    content: '2024년 신입사원을 환영하는 행사를 개최합니다.',
    author: '인사팀',
    date: '2024-01-08',
    department: '인사팀',
    relevance: 0.78
  }
];

const searchSuggestions = [
  '실적 보고서',
  '회의록',
  '업무 지침',
  '시스템 매뉴얼',
  '연차 신청',
  '급여 명세서',
  '조직도',
  '프로젝트 계획'
];

export const useSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    results: [],
    filters: {},
    isLoading: false,
    hasSearched: false,
    totalResults: 0,
    suggestions: []
  });

  const search = useCallback(async (query: string, filters?: SearchFilter) => {
    if (!query.trim()) return;

    setSearchState(prev => ({
      ...prev,
      isLoading: true,
      query,
      filters: filters || {}
    }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Filter mock results based on query and filters
    let filteredResults = mockResults.filter(result => {
      const matchesQuery = 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.content.toLowerCase().includes(query.toLowerCase()) ||
        (result.author && result.author.toLowerCase().includes(query.toLowerCase()));

      const matchesType = !filters?.type?.length || filters.type.includes(result.type);
      const matchesDepartment = !filters?.department?.length || 
        (result.department && filters.department.includes(result.department));

      return matchesQuery && matchesType && matchesDepartment;
    });

    // Sort by relevance
    filteredResults.sort((a, b) => b.relevance - a.relevance);

    setSearchState(prev => ({
      ...prev,
      results: filteredResults,
      isLoading: false,
      hasSearched: true,
      totalResults: filteredResults.length
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchState({
      query: '',
      results: [],
      filters: {},
      isLoading: false,
      hasSearched: false,
      totalResults: 0,
      suggestions: []
    });
  }, []);

  const getSuggestions = useCallback((query: string) => {
    if (!query.trim()) return [];
    
    return searchSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);
  }, []);

  useEffect(() => {
    if (searchState.query) {
      const suggestions = getSuggestions(searchState.query);
      setSearchState(prev => ({ ...prev, suggestions }));
    }
  }, [searchState.query, getSuggestions]);

  return {
    searchState,
    search,
    clearSearch,
    getSuggestions
  };
};
