import { FILTER_FIELDS } from '@/modules/product/constants';
import { ProductContext } from '@/modules/product/context/ProductContext';
import { useState } from 'react';

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [filterField, setFilterField] = useState(FILTER_FIELDS.product);
  const [adjustOffset, setAdjustOffset] = useState(0);

 const value = {
    currentPageNumber,
    setCurrentPageNumber,
    searchValue,
    setSearchValue,
    filterField,
    setFilterField,
    adjustOffset,
    setAdjustOffset,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
