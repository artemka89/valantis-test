import { Loader } from '@/shared/ui/icons/Loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { X } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FILTER_FIELDS } from '../../constants';

type BrandSelecProps = {
  brands: string[];
  isLoading: boolean;
  onSearch: (value: string) => void;
  getSearchQueryParams: () => {
    fieldQueryParam: string;
    searchQueryParam: string;
  };
};
export const BrandSelect: FC<BrandSelecProps> = ({
  brands,
  isLoading,
  onSearch,
  getSearchQueryParams,
}) => {
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const { fieldQueryParam, searchQueryParam } = getSearchQueryParams();

  useEffect(() => {
    if (searchQueryParam && fieldQueryParam === FILTER_FIELDS.brand) {
      setInputValue(searchQueryParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeBrand = (brand: string) => {
    if (searchQueryParam) {
      setInputValue(searchQueryParam);
    }
    setInputValue(brand);
    onSearch(brand);
  };

  const clearBrandValue = () => {
    setInputValue('');
    navigate('/');
  };

  return (
    <div className="relative">
      <Select onValueChange={onChangeBrand}>
        <SelectTrigger className="w-[270px] border px-2 text-base font-medium text-neutral-500">
          <SelectValue placeholder="выберите бренд" />
        </SelectTrigger>
        <SelectContent>
          {isLoading ? (
            <Loader />
          ) : (
            brands?.map((brand) => (
              <SelectItem value={brand} key={brand}>
                {brand}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {inputValue && (
        <X
          onClick={clearBrandValue}
          className={`absolute right-6 top-3 h-5 w-5 cursor-pointer text-neutral-500`}
        />
      )}
    </div>
  );
};
