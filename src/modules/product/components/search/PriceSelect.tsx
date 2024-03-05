import { FC, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetInfinityPrices } from '../../api';
import { cn } from '@/shared/lib/cn';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { Loader } from '@/shared/ui/icons/Loader';
import { Command, CommandGroup, CommandItem } from '@/shared/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';

type PriceInputProps = {
  onSearch: (value: string) => void;
};

export const PriceSelect: FC<PriceInputProps> = ({ onSearch }) => {
  const [selectValue, setSelectValue] = useState('');
  const [open, setOpen] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, status, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetInfinityPrices();

  const uniquePrices = new Set<number>();
  data?.pages.forEach((page) =>
    page.forEach((price) => uniquePrices.add(price))
  );

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const clearInputValue = () => {
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
              ? [...uniquePrices].find(
                  (price) => price.toString() === selectValue
                )
              : 'Выберите цену...'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandGroup className=" max-h-[300px] overflow-auto">
              {[...uniquePrices].map((price) => (
                <CommandItem
                  key={price}
                  value={price.toString()}
                  onSelect={(currentValue) => {
                    setSelectValue(
                      currentValue === selectValue ? '' : currentValue
                    );
                    setOpen(false);
                    onSearch(currentValue);
                  }}
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
      {selectValue !== 'Выберите цену...' && (
        <X
          onClick={clearInputValue}
          className={`absolute right-8 top-2.5 h-5 w-5 cursor-pointer text-neutral-500`}
        />
      )}
    </div>
  );
};
