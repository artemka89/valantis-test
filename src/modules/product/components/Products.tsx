import { FC, useEffect, useState } from 'react';
import { useGetProducts, useGetFilteredProducts } from '../api';
import { config } from '@/shared/lib/config';
import { FILTER_FIELDS } from '../constants';
import { ProductsList, ProductsPagination } from '.';
import { Search } from './search';
import { Loader } from '@/shared/ui/icons/Loader';

export const Products: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [filterField, setFilterField] = useState(FILTER_FIELDS.product);
  const [adjustOffset, setAdjustOffset] = useState(0);

  const {
    data: products,
    isSuccess: productsIsSuccess,
    isPending: productsIsLoading,
  } = useGetProducts({
    pageNumber: !searchValue ? currentPageNumber : undefined,
    adjustOffset,
  });

  const {
    data: filteredProducts,
    isSuccess: filteredProductsIsSuccess,
    isPending: filteredProductsIsLoading,
  } = useGetFilteredProducts(searchValue, filterField);

  const filteredProductsSlised = filteredProducts?.slice(
    (currentPageNumber - 1) * config.PAGE_SIZE,
    currentPageNumber * config.PAGE_SIZE
  );  

  const displayedProducts = searchValue
    ? { items: filteredProductsSlised, isLoading: filteredProductsIsLoading }
    : { items: products?.data, isLoading: productsIsLoading };

  useEffect(() => {
    const adjustOffset = products?.newOffset;
    if (adjustOffset) {
      setAdjustOffset((prev) => prev + adjustOffset);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  useEffect(() => {
    setCurrentPageNumber(1);
  }, [searchValue]);

  useEffect(() => {
    if (productsIsSuccess || filteredProductsIsSuccess) setIsLoading(false);
  }, [productsIsSuccess, filteredProductsIsSuccess]);

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
      <Search
        setSearchValue={setSearchValue}
        field={filterField}
        setField={setFilterField}
      />
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="flex items-center  gap-2">
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
              !searchValue ? productsIsLoading : filteredProductsIsLoading
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
              !searchValue ? productsIsLoading : filteredProductsIsLoading
            }
            visible={displayedProducts?.items?.length !== 0}
          />
        </div>
      )}
    </section>
  );
};
