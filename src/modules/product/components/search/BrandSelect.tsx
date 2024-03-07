import { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetBrands } from '../../api';
import { FILTER_FIELDS } from '../../constants';
import { X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Loader,
} from '@/shared/ui';

type BrandSelectProps = {
  onSearch: (value: string) => void;
};

export const BrandSelect: FC<BrandSelectProps> = ({ onSearch }) => {
  const [selectValue, setSelectValue] = useState('');

  const [searchParams] = useSearchParams();
  const searchFieldValue = searchParams.get('field');
  const searchParamValue = searchParams.get('search');

  const navigate = useNavigate();

  const { data, status } = useGetBrands();

  useEffect(() => {
    if (searchParamValue && searchFieldValue === FILTER_FIELDS.brand) {
      setSelectValue(searchParamValue);
      console.log(selectValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeBrand = (value: string) => {
    setSelectValue(value);
    onSearch(value);
  };

  const clearBrandValue = () => {
    setSelectValue('');
    navigate('/');
  };

  return (
    <div className="relative">
      <Select
        defaultValue={searchParamValue ? searchParamValue : undefined}
        onValueChange={onChangeBrand}
      >
        <SelectTrigger className="w-[270px] border px-2 text-base font-medium text-neutral-500">
          <SelectValue placeholder="выберите бренд" />
        </SelectTrigger>
        <SelectContent>
          {status === 'pending' ? (
            <Loader />
          ) : (
            data?.map((brand) => (
              <SelectItem value={brand} key={brand}>
                {brand}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {selectValue && (
        <X
          onClick={clearBrandValue}
          className={`absolute right-6 top-3 h-5 w-5 cursor-pointer text-neutral-500`}
        />
      )}
    </div>
  );
};
