import { FC } from 'react';
import { IProduct } from '../model/types';
import { ProductCard } from './ProductCard/ProductCard';
import { SkeletonCard } from './ProductCard/SkeletonCard';

type ProductsListProps = {
  products: IProduct[] | undefined;
  isLoading: boolean;
  Pagination: () => JSX.Element;
};

export const ProductsList: FC<ProductsListProps> = ({
  products,
  isLoading,
  Pagination,
}) => {
  
  if (products?.length === 0)
    return (
      <div className="mt-24 flex flex-col items-center justify-center gap-2 text-2xl">
        Товары отсутствуют
      </div>
    );

  return (
    <div>
      <Pagination />
      <div className="grid grid-cols-products-container justify-center gap-8">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : products?.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                title={item.product}
                price={item.price}
                brand={item.brand}
              />
            ))}
      </div>
      <Pagination />
    </div>
  );
};
