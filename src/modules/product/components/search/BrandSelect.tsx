import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetBrands } from '../../api';
import { FILTER_FIELDS } from '../../constants';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import {
  Button,
  Command,
  CommandGroup,
  CommandItem,
  Loader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/ui';
import { cn } from '@/shared/lib';

type BrandSelectProps = {
  onSearch: (value: string) => void;
};

export const BrandSelect: FC<BrandSelectProps> = ({ onSearch }) => {
  const [searchParams] = useSearchParams();
  const searchFieldValue = searchParams.get('field');
  const searchParamValue = searchParams.get('search');

  const [selectValue, setSelectValue] = useState('');
  const [open, setOpen] = useState(false);

  const { data, status } = useGetBrands();

  useEffect(() => {
    if (searchParamValue && searchFieldValue === FILTER_FIELDS.brand) {
      setSelectValue(searchParamValue);    
    } else {
      setSelectValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeSelectValue = (value: string) => {
    setSelectValue(value);
    setOpen(false);
    onSearch(value);
  };

  const clearSelectValue = () => {
    setSelectValue('');
    onSearch('');    
  };

  return (
    <div className="relative">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {selectValue
              ? data?.find((brand) => brand === selectValue)
              : 'Выберите бренд...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandGroup className=" max-h-[300px] overflow-auto">
              {data?.map((brand) => (
                <CommandItem
                  key={brand}
                  value={brand}
                  onSelect={() => {
                    setSelectValue(
                      brand === selectValue ? '' : brand
                    );
                    setOpen(false);
                    onChangeSelectValue(brand);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectValue === brand
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {brand}
                </CommandItem>
              ))}
              {status === 'pending' && (
                <>
                  <Loader stroke="orange" />
                  Загрузка...
                </>
              )}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {selectValue && (
        <X
          onClick={clearSelectValue}
          className={`absolute right-8 top-2.5 h-5 w-5 cursor-pointer text-neutral-500`}
        />
      )}
    </div>
  );
};
