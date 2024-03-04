import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { FILTER_FIELDS, PRODUCT_QUERY_KEYS } from '../constants';
import {
  fetchBrandNames,
  fetchFilteredProducts,
  fetchPrices,
  fetchProducts,
} from './productApi';

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

export const useGetSearchingProducts = (value: string, field: string) => {
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
    queryKey: [PRODUCT_QUERY_KEYS.foundProducts, value],
    queryFn: () => fetchFilteredProducts<string | number>(filterParams),
    enabled: !!value,
  });
};

export const useGetBrandFields = (field: FILTER_FIELDS | null) => {
  if (field !== FILTER_FIELDS.brand) {
    field = null;
  }
  return useQuery({
    queryKey: [PRODUCT_QUERY_KEYS.brandFields, field],
    queryFn: fetchBrandNames,
    enabled: !!field,
  });
};

export const useGetInfinityPrices = (field: FILTER_FIELDS | null) => {
  if (field !== FILTER_FIELDS.price) {
    field = null;
  }
  return useInfiniteQuery({
    queryKey: [PRODUCT_QUERY_KEYS.prices],
    queryFn: ({ pageParam }) => fetchPrices({ pageParam }),
    initialPageParam: 0,
    getNextPageParam: (_lastPage, _AllPages, prevPage) => prevPage + 1,
    enabled: !!field,
  });
};
