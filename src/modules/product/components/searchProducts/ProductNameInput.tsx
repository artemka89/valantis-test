import { ChangeEvent, FC, useEffect, useState, KeyboardEvent } from 'react';
import { Input } from '@/shared/ui/input';
import { X, Search } from 'lucide-react';
import { FILTER_FIELDS } from '../../constants';
import { Button } from '@/shared/ui/button';

type ProductNameInputType = {
  onSearch: (value: string) => void;
  getSearchQueryParams: () => {
    fieldQueryParam: string;
    searchQueryParam: string;
  };
};

export const ProductNameInput: FC<ProductNameInputType> = ({
  onSearch,
  getSearchQueryParams,
}) => {
  const [inputValue, setInputValue] = useState('');

  const { fieldQueryParam, searchQueryParam } = getSearchQueryParams();

  useEffect(() => {
    if (searchQueryParam && fieldQueryParam === FILTER_FIELDS.product) {
      setInputValue(searchQueryParam);
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