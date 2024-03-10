import { createContext } from 'react';
import { FILTER_FIELDS } from '../constants';

type SearchContextType = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  filterField: FILTER_FIELDS;
  setFilterField: React.Dispatch<React.SetStateAction<FILTER_FIELDS>>;
  currentPageNumber: number;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
};

const initialState = {  
  searchValue: '',
  setSearchValue: () => {},
  filterField: FILTER_FIELDS.product,
  setFilterField: () => {},
  currentPageNumber: 1,
  setCurrentPageNumber: () => {},
};

export const ProductContext = createContext<SearchContextType>(initialState);
