import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BrandSelect, PriceSelect, ProductNameInput } from '.';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { FILTER_FIELDS } from '../../constants';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  searchParams
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
      <Select defaultValue={field} onValueChange={onChangeField}>
        <SelectTrigger className="w-[95px] text-base font-medium text-orange-600">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={FILTER_FIELDS.product}>названию</SelectItem>
          <SelectItem value={FILTER_FIELDS.price}>цене</SelectItem>
          <SelectItem value={FILTER_FIELDS.brand}>бренду</SelectItem>
        </SelectContent>
      </Select>

      {field === FILTER_FIELDS.brand && <BrandSelect onSearch={onSearch} />}
      {field === FILTER_FIELDS.product && (
        <ProductNameInput onSearch={onSearch} />
      )}
      {field === FILTER_FIELDS.price && <PriceSelect onSearch={onSearch} />}
    </div>
  );
};
