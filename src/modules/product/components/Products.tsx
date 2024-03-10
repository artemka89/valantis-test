import { FC } from 'react';
import { Search } from '.';
import { AllProducts } from './AllProducts';
import { FilteredProducts } from './FilteredProducts';
import { useProductContext } from '../hooks/useProductContext';

export const Products: FC = () => {
  const { searchValue } = useProductContext();

  return (
    <section className="mb-6">
      <Search />
      {searchValue ? <FilteredProducts /> : <AllProducts />}
    </section>
  );
};
