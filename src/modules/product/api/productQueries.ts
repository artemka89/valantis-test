import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { FILTER_FIELDS, PRODUCT_QUERY_KEYS } from '../constants';
import {
  fetchProducts,
  fetchFilteredProducts,
  fetchPrices,
  fetchBrands,
} from '.';

export const useGetProducts = ({
  pageNumber,
  adjustOffset,
}: {
  pageNumber: number | null;
  adjustOffset: number;
}) => { 
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEYS.products, pageNumber],
    queryFn: () => fetchProducts({ pageNumber, adjustOffset }),
    enabled: !!pageNumber,
  });
};

export const useGetFilteredProducts = (
  searchValue: string,
  searchField: string
) => {
  let filterParams = {};
  if (searchField === FILTER_FIELDS.price) {
    filterParams = { [FILTER_FIELDS.price]: Number(searchValue) };
  }
  if (searchField === FILTER_FIELDS.brand) {
    filterParams = { [FILTER_FIELDS.brand]: searchValue };
  }
  if (searchField === FILTER_FIELDS.product) {
    filterParams = { [FILTER_FIELDS.product]: searchValue };
  }
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEYS.filteredProducts, searchValue],
    queryFn: () => fetchFilteredProducts<string | number>(filterParams),
    enabled: !!searchValue,
  });
};

export const useGetBrands = () => {
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEYS.brandFields],
    queryFn: fetchBrands,
  });
};

export const useGetInfinityPrices = () => {
  return useInfiniteQuery({
    queryKey: [PRODUCT_QUERY_KEYS.prices],
    queryFn: ({ pageParam }) => fetchPrices({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0) return null;
      return lastPageParam + 1;
    },
    select: (data) => {
      const uniquePrices = new Set<number>();
      data?.pages.forEach((page) =>
        page.forEach((price) => uniquePrices.add(price))
      );
      return [...uniquePrices]
    },
  });
};
