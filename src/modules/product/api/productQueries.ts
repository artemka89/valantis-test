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
  pageNumber: number | undefined;
  adjustOffset: number;
}) => {
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEYS.products, pageNumber],
    queryFn: () => fetchProducts({ pageNumber, adjustOffset }),
    enabled: !!pageNumber,
  });
};

export const useGetFilteredProducts = (value: string, field: string) => {
  let filterParams = {};
  if (field === FILTER_FIELDS.price) {
    filterParams = { [FILTER_FIELDS.price]: Number(value) };
  }
  if (field === FILTER_FIELDS.brand) {
    filterParams = { [FILTER_FIELDS.brand]: value };
  }
  if (field === FILTER_FIELDS.product) {
    filterParams = { [FILTER_FIELDS.product]: value };
  }
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEYS.filteredProducts, value],
    queryFn: () => fetchFilteredProducts<string | number>(filterParams),
    enabled: !!value,
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
  });
};
