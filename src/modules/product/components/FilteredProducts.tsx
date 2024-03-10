import { FC, useEffect } from 'react';
import { useGetFilteredProducts } from '../api';
import { useProductContext } from '../hooks/useProductContext';
import { config } from '@/shared/lib';
import { ProductsList, ProductsPagination } from '.';

export const FilteredProducts: FC = () => {
  const {
    currentPageNumber,
    setCurrentPageNumber,
    filterField,
    searchValue,
  } = useProductContext();

  const { data, status } = useGetFilteredProducts(searchValue, filterField);

  const slicedData = data?.slice(
    (currentPageNumber - 1) * config.PAGE_SIZE,
    currentPageNumber * config.PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPageNumber(1);
  }, [searchValue, setCurrentPageNumber]);

  const isLastPage = slicedData ? slicedData.length < config.PAGE_SIZE : false;

  return (
    <ProductsList
      products={slicedData}
      isLoading={status === 'pending'}
      Pagination={() => (
        <ProductsPagination
          setPageNumber={setCurrentPageNumber}
          pageNumber={currentPageNumber}
          isLastPage={isLastPage}
          isLoading={status === 'pending'}
          visible={slicedData?.length !== 0}
        />
      )}
    />
  );
};
