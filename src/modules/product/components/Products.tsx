import { FC, useEffect, useState } from 'react';
import { useGetProducts, useGetFilteredProducts } from '../api';
import { config } from '@/shared/lib';
import { useProductContext } from '../hooks/useProductContext';
import { ProductsList, ProductsPagination } from '.';
import { Search } from './search';
import { Loader } from '@/shared/ui';

export const Products: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    currentPageNumber,
    setCurrentPageNumber,
    searchValue,
    filterField,
    adjustOffset,
    setAdjustOffset,
  } = useProductContext();

  const { data: products, status: statusProducts } = useGetProducts({
    pageNumber: !searchValue ? currentPageNumber : null,
    adjustOffset,
  });

  const { data: filteredProducts, status: statusFilteredProducts } =
    useGetFilteredProducts(searchValue, filterField);

  const filteredProductsSlised = filteredProducts?.slice(
    (currentPageNumber - 1) * config.PAGE_SIZE,
    currentPageNumber * config.PAGE_SIZE
  );

  const displayedProducts = searchValue
    ? {
        items: filteredProductsSlised,
        isLoading: statusFilteredProducts === 'pending',
      }
    : { items: products?.data, isLoading: statusProducts === 'pending' };

  useEffect(() => {
    if (statusProducts === 'success' || statusFilteredProducts === 'success')
      setIsLoading(false);
  }, [statusProducts, statusFilteredProducts]);

  useEffect(() => {
    const adjustOffset = products?.newOffset;
    if (adjustOffset) {
      setAdjustOffset((prev) => prev + adjustOffset);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    setCurrentPageNumber(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const getLastPage = () => {
    if (!searchValue) {
      return products?.data ? products?.data.length < config.PAGE_SIZE : false;
    } else {
      return filteredProductsSlised
        ? filteredProductsSlised?.length < config.PAGE_SIZE
        : false;
    }
  };

  return (
    <section className="mb-6">
      <Search />
      {isLoading ? (
        <div className="mt-10 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader stroke="orange" />
            Загрузка...
          </div>
        </div>
      ) : (
        <div>
          <ProductsPagination
            setPageNumber={setCurrentPageNumber}
            pageNumber={currentPageNumber}
            getLastPage={getLastPage}
            isLoading={
              !searchValue
                ? statusProducts === 'pending'
                : statusFilteredProducts === 'pending'
            }
            visible={displayedProducts?.items?.length !== 0}
          />
          <ProductsList
            products={displayedProducts.items}
            isLoading={displayedProducts.isLoading}
          />
          <ProductsPagination
            setPageNumber={setCurrentPageNumber}
            pageNumber={currentPageNumber}
            getLastPage={getLastPage}
            isLoading={
              !searchValue
                ? statusProducts === 'pending'
                : statusFilteredProducts === 'pending'
            }
            visible={displayedProducts?.items?.length !== 0}
          />
        </div>
      )}
    </section>
  );
};
