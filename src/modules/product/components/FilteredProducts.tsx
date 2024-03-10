import { FC, useEffect, useState } from 'react';
import { useGetFilteredProducts } from '../api';
import { useProductContext } from '../hooks/useProductContext';
import { config } from '@/shared/lib';
import { ProductsList, ProductsPagination } from '.';
import { Loader } from '@/shared/ui';

export const FilteredProducts: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { currentPageNumber, setCurrentPageNumber, filterField, searchValue } =
    useProductContext();

  const { data, status } = useGetFilteredProducts(searchValue, filterField);

  const slicedData = data?.slice(
    (currentPageNumber - 1) * config.PAGE_SIZE,
    currentPageNumber * config.PAGE_SIZE
  );

  useEffect(() => {
    setCurrentPageNumber(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    if (status === 'success') setIsLoading(false);
  }, [status]);

  const getLastPage = () => {
    return slicedData ? slicedData.length < config.PAGE_SIZE : false;
  };

  if (isLoading) {
    <div className="mt-10 flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Loader stroke="orange" />
        Загрузка...
      </div>
    </div>;
  }

  return (
    <div>
      <ProductsPagination
        setPageNumber={setCurrentPageNumber}
        pageNumber={currentPageNumber}
        getLastPage={getLastPage}
        isLoading={status === 'pending'}
        visible={slicedData?.length !== 0}
      />
      <ProductsList products={slicedData} isLoading={status === 'pending'} />
      <ProductsPagination
        setPageNumber={setCurrentPageNumber}
        pageNumber={currentPageNumber}
        getLastPage={getLastPage}
        isLoading={status === 'pending'}
        visible={slicedData?.length !== 0}
      />
    </div>
  );
};
