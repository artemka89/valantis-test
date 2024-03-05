import uniqBy from 'lodash.uniqby';
import { IProduct } from '../model/types';
import { UUID } from 'crypto';
import { fetch } from '@/shared/api/valantisApi';
import { ACTION_NAMES } from '@/shared/api/types';
import { config } from '@/shared/lib/config';

export const fetchProducts = async ({
  pageNumber,
  adjustOffset,
}: {
  pageNumber: number | undefined;
  adjustOffset: number;
}) => {
  if (!pageNumber) return;
  const limit = config.PAGE_SIZE;
  const offset = (pageNumber - 1) * limit + adjustOffset;
  const { newIds, newOffset } = await fetchUniqueIds(offset, limit);
  const products = await fetch<IProduct[], UUID[]>({
    action: ACTION_NAMES.getItems,
    params: { ids: [...newIds] },
  });
  const uniqProductRes = uniqBy(products?.data.result, 'id');
  return { data: uniqProductRes, newOffset };
};

async function fetchUniqueIds(
  offset: number,
  limit: number
): Promise<{ newIds: Set<UUID>; newOffset: number }> {
  const idsRes = await fetch<UUID[], number>({
    action: ACTION_NAMES.getIds,
    params: { offset, limit },
  });
  if (!idsRes) {
    return { newIds: new Set(), newOffset: 0 };
  }
  const ids = idsRes.data.result;
  const uniqueIds = new Set(ids);
  let newOffset = 0;
  if (uniqueIds.size < limit && ids.length !== uniqueIds.size) {
    const count = limit - uniqueIds.size;
    const { newIds } = await fetchUniqueIds(offset + limit, count);
    newIds.forEach((id) => uniqueIds.add(id));
    newOffset += count;
  }
  return { newIds: uniqueIds, newOffset };
}

export const fetchFilteredProducts = async <T>(params: {
  [key: string]: T;
}) => {
  const resIds = await fetch<UUID[], T>({
    action: ACTION_NAMES.filter,
    params,
  });
  if (!resIds) return [];
  const ids = resIds.data.result;
  const productRes = await fetch<IProduct[], UUID[]>({
    action: ACTION_NAMES.getItems,
    params: { ids },
  });
  const uniqProductRes = uniqBy(productRes?.data.result, 'id');
  return uniqProductRes;
};

export const fetchBrands = async () => {
  const brands = await fetch<string[], string>({
    action: ACTION_NAMES.getFields,
    params: { field: 'brand' },
  });
  const brandsWithoutNull = brands.data.result.filter(
    (brand) => brand !== null
  );
  const uniqueBrands = new Set(brandsWithoutNull);
  return [...uniqueBrands];
};

export const fetchPrices = async ({ pageParam }: { pageParam: number }) => {
  const limit = 667;
  const offset = pageParam * limit;
  const uniquePrices = await fetchUniquePrices(offset, limit);
  return [...uniquePrices];
};

async function fetchUniquePrices(
  offset: number,
  limit: number
): Promise<Set<number>> {
  const pricesRes = await fetch<number[], string | number>({
    action: ACTION_NAMES.getFields,
    params: { field: 'price', offset, limit },
  });
  if (!pricesRes) {
    return new Set();
  }
  const prices = pricesRes.data.result;
  const uniquePrices = new Set(prices);
  if (uniquePrices.size < limit && prices.length !== uniquePrices.size) {
    const count = limit - uniquePrices.size;
    const newPrices = await fetchUniquePrices(offset + limit, count);
    newPrices.forEach((price) => uniquePrices.add(price));
  }
  return uniquePrices;
}
