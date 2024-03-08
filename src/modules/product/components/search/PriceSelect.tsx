import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { FILTER_FIELDS } from '../../constants';
import { useGetInfinityPrices } from '../../api';
import { cn } from '@/shared/lib/cn';
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

type PriceInputProps = {
  onSearch: (value: string) => void;
};

export const PriceSelect: FC<PriceInputProps> = ({ onSearch }) => {
  const [selectValue, setSelectValue] = useState('');
  const [open, setOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const searchFieldValue = searchParams.get('field');
  const searchParamValue = searchParams.get('search');

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetInfinityPrices();

  useEffect(() => {
    if (searchParamValue && searchFieldValue === FILTER_FIELDS.price) {
      setSelectValue(searchParamValue);
    } else {
      setSelectValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

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
              ? data?.find((price) => price.toString() === selectValue)
              : 'Выберите цену...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandGroup className=" max-h-[300px] overflow-auto">
              {data?.map((price) => (
                <CommandItem
                  key={price}
                  value={price.toString()}
                  onSelect={onChangeSelectValue}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectValue === price.toString()
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {price}
                </CommandItem>
              ))}
              {hasNextPage && (
                <div
                  className=" flex h-8 items-center  justify-center gap-2"
                  ref={ref}
                >
                  {(status === 'pending' || isFetchingNextPage) && (
                    <>
                      <Loader stroke="orange" />
                      Загрузка...
                    </>
                  )}
                </div>
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
