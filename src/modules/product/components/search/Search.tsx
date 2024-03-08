import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BrandSelect, PriceSelect, ProductNameInput } from '.';
import { useProductContext } from '../../hooks/useProductContext';
import { FILTER_FIELDS } from '../../constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

export const Search: FC = () => {
  const { setSearchValue, filterField, setFilterField } = useProductContext();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchParamValue = searchParams.get('search');
    const fieldParamValue = searchParams.get('field');
    if (searchParamValue && fieldParamValue) {
      setSearchValue(searchParamValue);
      setFilterField(fieldParamValue as FILTER_FIELDS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (value: string) => {
    setSearchValue(value);
    if (value) {
      setSearchParams({ field: filterField, search: value });
    } else setSearchParams('');  
  };

  const onChangeFilterField = (field: FILTER_FIELDS) => {
    setFilterField(field);
    setSearchValue('');
    setSearchParams(''); 
  };

  return (
    <div className="flex items-center gap-2 py-4">
      <span className="text-base font-medium">Поиск по:</span>
      <Select defaultValue={filterField} onValueChange={onChangeFilterField}>
        <SelectTrigger className="w-[95px] text-base font-medium text-orange-600">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={FILTER_FIELDS.product}>названию</SelectItem>
          <SelectItem value={FILTER_FIELDS.price}>цене</SelectItem>
          <SelectItem value={FILTER_FIELDS.brand}>бренду</SelectItem>
        </SelectContent>
      </Select>

      {filterField === FILTER_FIELDS.brand && (
        <BrandSelect onSearch={onSearch} />
      )}
      {filterField === FILTER_FIELDS.product && (
        <ProductNameInput onSearch={onSearch} />
      )}
      {filterField === FILTER_FIELDS.price && (
        <PriceSelect onSearch={onSearch} />
      )}
    </div>
  );
};
