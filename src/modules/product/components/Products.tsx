import { FC, useEffect, useState } from 'react';
import { useGetProducts, useGetSearchingProducts } from '../api';
import { useDebounce } from '@/shared/hooks';
import { FILTER_FIELDS } from '../constants';
import { ProductsList, ProductsPagination, SearchProducts } from '.';
import { Loader } from '@/shared/ui/icons/Loader';
import { config } from '@/shared/lib/config';

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

  const debouncedSearch = useDebounce(searchValue, 500);
  const {
    data: foundProducts,
    isSuccess: foundProductsIsSuccess,
    isPending: foundProductsIsLoading,
  } = useGetSearchingProducts(debouncedSearch, filterField);

  const foundProductsSlised = foundProducts?.slice(
    (currentPageNumber - 1) * config.PAGE_SIZE,
    currentPageNumber * config.PAGE_SIZE
  );

  const getLastPage = () => {
    if (!searchValue) {
      return products?.data ? products?.data.length < config.PAGE_SIZE : false;
    } else {
      return foundProductsSlised
        ? foundProductsSlised?.length < config.PAGE_SIZE
        : false;
    }
  };

  const displayedProducts = searchValue
    ? { items: foundProducts, isLoading: foundProductsIsLoading }
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
    if (productsIsSuccess || foundProductsIsSuccess) setIsLoading(false);
  }, [productsIsSuccess, foundProductsIsSuccess]);

  return (
    <section className="mb-6">
      <SearchProducts
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
              !searchValue ? productsIsLoading : foundProductsIsLoading
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
              !searchValue ? productsIsLoading : foundProductsIsLoading
            }
            visible={displayedProducts?.items?.length !== 0}
          />
        </div>
      )}
    </section>
  );
};
