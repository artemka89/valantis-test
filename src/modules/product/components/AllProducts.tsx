import { FC, useEffect, useState } from 'react';
import { useGetProducts } from '../api';
import { useProductContext } from '../hooks/useProductContext';
import { config } from '@/shared/lib';
import { ProductsList, ProductsPagination } from '.';
import { Loader } from '@/shared/ui';

export const AllProducts: FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    currentPageNumber,
    setCurrentPageNumber,
    adjustOffset,
    setAdjustOffset,
  } = useProductContext();

  const { data, status } = useGetProducts({
    pageNumber: currentPageNumber,
    adjustOffset,
  });

  useEffect(() => {
    if (status === 'success') setIsLoading(false);
  }, [status]);

  useEffect(() => {
    const adjustOffset = data?.newOffset;
    if (adjustOffset) {
      setAdjustOffset((prev) => prev + adjustOffset);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const getLastPage = () => {
    return data?.data ? data?.data.length < config.PAGE_SIZE : false;
  };

  if (isLoading) {
    return (
      <div className="mt-10 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader stroke="orange" />
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProductsPagination
        setPageNumber={setCurrentPageNumber}
        pageNumber={currentPageNumber}
        getLastPage={getLastPage}
        isLoading={status === 'pending'}
        visible={data?.data.length !== 0}
      />
      <ProductsList products={data?.data} isLoading={status === 'pending'} />
      <ProductsPagination
        setPageNumber={setCurrentPageNumber}
        pageNumber={currentPageNumber}
        getLastPage={getLastPage}
        isLoading={status === 'pending'}
        visible={data?.data.length !== 0}
      />
    </div>
  );
};
