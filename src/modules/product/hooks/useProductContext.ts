import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

export const useProductContext = () => useContext(ProductContext);
