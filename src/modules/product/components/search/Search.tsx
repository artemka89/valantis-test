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
  const { searchValue, setSearchValue, filterField, setFilterField } =
    useProductContext();

  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamValue = searchParams.get('search');
  const fieldParamValue = searchParams.get('field');

  useEffect(() => {
    if (searchParamValue && fieldParamValue) {
      setSearchValue(searchParamValue);
      setFilterField(fieldParamValue as FILTER_FIELDS);
      console.log(fieldParamValue);
      console.log(searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (value: string) => {
    setSearchValue(value);
    if (value) {
      setSearchParams({ field: filterField, search: value });
    } else setSearchParams('');
  };

  const onChangeField = (e: FILTER_FIELDS) => {
    setFilterField(e);
    setSearchValue('');
  };

  return (
    <div className="flex items-center gap-2 py-4">
      <span className="text-base font-medium">Поиск по:</span>
      <Select
        defaultValue={fieldParamValue ?? filterField}
        onValueChange={onChangeField}
      >
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
