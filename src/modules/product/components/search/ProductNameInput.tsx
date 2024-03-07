import { ChangeEvent, FC, useState, KeyboardEvent, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FILTER_FIELDS } from '../../constants';
import { X, Search } from 'lucide-react';
import { Button, Input } from '@/shared/ui';

type ProductNameInputType = {
  onSearch: (value: string) => void;
};

export const ProductNameInput: FC<ProductNameInputType> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const [searchParams] = useSearchParams();
  const searchFieldValue = searchParams.get('field');
  const searchParamValue = searchParams.get('search');

  useEffect(() => {
    if (searchParamValue && searchFieldValue === FILTER_FIELDS.product) {
      setInputValue(searchParamValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const onEnterInput = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(inputValue);
    }
  };

  const clearInputValue = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Поиск..."
          value={inputValue}
          onChange={onChangeInput}
          onKeyDown={onEnterInput}
          className="peer/input w-[200px] text-base font-medium"
        />
        {inputValue && (
          <X
            onClick={clearInputValue}
            className={`absolute right-2 top-2.5 h-5 w-5 cursor-pointer`}
          />
        )}
      </div>
      <Button onClick={() => onSearch(inputValue)}>
        <Search />
      </Button>
    </div>
  );
};
