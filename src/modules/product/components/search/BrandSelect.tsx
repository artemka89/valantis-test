import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetBrands } from '../../api';
import { X } from 'lucide-react';
import { Loader } from '@/shared/ui/icons/Loader';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';


type BrandSelectProps = {
  onSearch: (value: string) => void;
};

export const BrandSelect: FC<BrandSelectProps> = ({ onSearch }) => {
  const [selectValue, setSelectValue] = useState('');

  const navigate = useNavigate();

  const { data, status } = useGetBrands();

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
      <Select onValueChange={onChangeBrand}>
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
