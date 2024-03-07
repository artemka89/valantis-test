import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProduct } from '../model/types';
import { ProductCard } from './ProductCard';
import { Button, Loader } from '@/shared/ui';

type ProductsListProps = {
  products: IProduct[] | undefined;
  isLoading: boolean;
};

export const ProductsList: FC<ProductsListProps> = ({
  products,
  isLoading,
}) => {
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex items-center justify-center gap-2">
        <Loader stroke="orange" />
        Загрузка...
      </div>
    );

  if (products?.length === 0)
    return (
      <div className="mt-24 flex flex-col items-center justify-center gap-2 text-2xl">
        Товары отсутствуют
        <Button onClick={() => navigate(-1)}>Назад</Button>
      </div>
    );

  return (
    <div className="grid grid-cols-products-container justify-center gap-8">
      {products?.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          title={item.product}
          price={item.price}
          brand={item.brand}
        />
      ))}
    </div>
  );
};
