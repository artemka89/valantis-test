import { FC } from 'react';
import { ROOT_PATH } from '@/shared/lib/config';

type ProductCardProps = {
  id: string;
  brand: string | null;
  title: string;
  price: number;
};

export const ProductCard: FC<ProductCardProps> = ({
  id,
  brand,
  title,
  price,
}) => {
  return (
    <div className="flex h-[300px] w-[200px] cursor-pointer flex-col justify-end overflow-hidden rounded-md border border-neutral-300 transition duration-200 hover:border-neutral-400 hover:shadow-md">
      <h3 className="mb-auto px-2 py-3 text-center font-medium">{title}</h3>
      {brand && <div className="mb-1 text-center text-orange-600">{brand}</div>}
      <div className="flex h-[100px] w-full items-center justify-center">
        <img
          src={`${ROOT_PATH}logo.svg`}
          alt="product"
          className="h-full object-cover"
        />
      </div>
      <div className="px-2 py-4">
        <div>
          Цена: <span className="font-bold">{price} ₽</span>
        </div>
        <div className="mt-2 text-sm">id: {id}</div>
      </div>
    </div>
  );
};
