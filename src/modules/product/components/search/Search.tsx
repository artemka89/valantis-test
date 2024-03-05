import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { FILTER_FIELDS } from '../../constants';
import { ProductNameInput } from './ProductNameInput';
import { PriceSelect } from './PriceSelect';
import { BrandSelect } from './BrandSelect';
import { useGetBrandFields } from '../../api/productQueries';

type SearchProps = {
  field: FILTER_FIELDS;
  setField: (value: FILTER_FIELDS) => void;
  setSearchValue: (value: string) => void;
};

export const Search: FC<SearchProps> = ({
  field,
  setField,
  setSearchValue,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSearch = searchParams.get('search') || '';
  const currentField = searchParams.get('field') || '';

  const { data: brands, isPending: isLoadingBrands } = useGetBrandFields(field);

  useEffect(() => {
    if (currentSearch) {
      setSearchValue(currentSearch);
    }
    const { fieldQueryParam, searchQueryParam } = getSearchQueryParams();
    setField((fieldQueryParam as FILTER_FIELDS) || field);
    setSearchValue(searchQueryParam || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSearchQueryParams = () => {
    const fieldQueryParam = searchParams.get('field');
    const searchQueryParam = searchParams.get('search');
    if (fieldQueryParam && searchQueryParam) {
      return { fieldQueryParam, searchQueryParam };
    }
    return { fieldQueryParam: '', searchQueryParam: '' };
  };

  const onSearch = (value: string) => {
    setSearchValue(value);
    if (value) {
      setSearchParams({ field, search: value });
    } else setSearchParams('');
  };

  const onChangeField = (e: FILTER_FIELDS) => {
    setField(e);
    setSearchValue('');
    setSearchParams('');
  };

  return (
    <div className="flex items-center gap-2 py-4">
      <span className="text-base font-medium">Поиск по:</span>
      <Select
        defaultValue={currentField ? currentField : field}
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

      {field === FILTER_FIELDS.brand && brands && (
        <BrandSelect
          brands={brands}
          isLoading={isLoadingBrands}
          onSearch={onSearch}
          getSearchQueryParams={getSearchQueryParams}
        />
      )}
      {field === FILTER_FIELDS.product && (
        <ProductNameInput
          onSearch={onSearch}
          getSearchQueryParams={getSearchQueryParams}
        />
      )}
      {field === FILTER_FIELDS.price && <PriceSelect onSearch={onSearch} />}
    </div>
  );
};
