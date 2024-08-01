import { ReactNode, createContext, useContext, useReducer } from 'react';
import { SearchResult } from '@/core/services/search';
import {
  PaymentConfirmed,
  ProcessPaymentResponse,
} from '@/core/services/orders';

type SearchResultsState = {
  results: SearchResult | null;
  order: ProcessPaymentResponse | null;
  payment: PaymentConfirmed | null;
  premium: boolean;
};

type SearchResultsType = SearchResultsState & {
  setSearchResults: React.Dispatch<Partial<SearchResultsState>>;
};

const initialState: SearchResultsType = {
  results: null,
  order: null,
  payment: null,
  premium: false,
  setSearchResults(_) {},
};

const SearchResultsContext = createContext<SearchResultsType>(initialState);

export function SearchResultsProvider({ children }: { children: ReactNode }) {
  const [results, setSearchResults] = useReducer(
    (state: SearchResultsState, newState: Partial<SearchResultsState>) => ({
      ...state,
      ...newState,
    }),
    initialState
  );

  return (
    <SearchResultsContext.Provider value={{ ...results, setSearchResults }}>
      {children}
    </SearchResultsContext.Provider>
  );
}

export function useSearchResults(): SearchResultsType {
  return useContext<SearchResultsType>(SearchResultsContext);
}
