import { FC, useEffect, useState } from 'react';
import { useGetProducts } from '../api';
import { useProductContext } from '../hooks/useProductContext';
import { config } from '@/shared/lib';
import { ProductsList, ProductsPagination } from '.';

export const AllProducts: FC = () => {
  const [adjustOffset, setAdjustOffset] = useState(0);

  const { currentPageNumber, setCurrentPageNumber } =
    useProductContext();

  const { data, status } = useGetProducts({
    pageNumber: currentPageNumber,
    adjustOffset,
  });

  useEffect(() => {
    const adjustOffset = data?.newAdjustOffset;
    if (adjustOffset) {
      setAdjustOffset((prev) => prev + adjustOffset);
    }
  }, [data]);

  const isLastPage = data?.data ? data?.data.length < config.PAGE_SIZE : false;

  return (
    <ProductsList
      products={data?.data}
      isLoading={status === 'pending'}
      Pagination={() => (
        <ProductsPagination
          setPageNumber={setCurrentPageNumber}
          pageNumber={currentPageNumber}
          isLastPage={isLastPage}
          isLoading={status === 'pending'}
          visible={data?.data.length !== 0}
        />
      )}
    />
  );
};
