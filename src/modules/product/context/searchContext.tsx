import { createContext } from 'react';

type SearchContextType = {
  searchValue: string;
  searchSetValue: React.Dispatch<React.SetStateAction<string>>;
  field: string;
  setField: React.Dispatch<React.SetStateAction<string>>;
};

const initialState = {
  searchValue: '',
  searchSetValue: () => {},
  field: 'title',
  setField: () => {},
};

export const SearchContext = createContext<SearchContextType>(initialState);
