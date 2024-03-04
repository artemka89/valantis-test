import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { cn } from '@/shared/lib/cn';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Loader } from '@/shared/ui/icons/Loader';
import { Command, CommandGroup, CommandItem } from '@/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';

type PriceInputProps = {
  pricePages: InfiniteData<number[], unknown> | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<InfiniteData<number[], unknown>, Error>
  >;
  isLoading: boolean;
  onSearch: (value: string) => void;
  isLastPage: () => boolean;
};

export const PriceSelect: FC<PriceInputProps> = ({
  pricePages,
  fetchNextPage,
  isLoading,
  onSearch,
  isLastPage
}) => {
  const [prices, setPrices] = useState<Set<number>>(new Set());

  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {

    if (inView && !isLastPage()) isGetNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const clearInputValue = () => {
    setValue('');
    onSearch('');
  };

  const isGetNextPage = async () => {
    const is = await fetchNextPage();
    if (is.status === 'success') {
      const prices = pricePages?.pages;
      prices?.[prices.length - 1].forEach((price) =>
        setPrices((prev) => prev.add(price))
      );
    }
    return is;
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
            {value
              ? [...prices].find((price) => price.toString() === value)
              : 'Выберите цену...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandGroup className=" h-[300px] overflow-auto">
              {[...prices].map((price) => (
                <CommandItem
                  key={price}
                  value={price.toString()}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                    onSearch(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === price.toString() ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {price}
                </CommandItem>
              ))}
              {isLoading && (
                <div className="flex items-center justify-center  gap-2">
                  <Loader stroke="orange" />
                  Загрузка...
                </div>
              )}
              <div className="mt-8" ref={ref}></div>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {value !== 'Выберите цену...' && (
        <X
          onClick={clearInputValue}
          className={`absolute right-8 top-2.5 h-5 w-5 cursor-pointer text-neutral-500`}
        />
      )}
    </div>
  );
};
