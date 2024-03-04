import { FC } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination';

type ProductsPaginationProps = {
  setPageNumber: (value: React.SetStateAction<number>) => void;
  pageNumber: number;
  isLoading: boolean;
  getLastPage: () => boolean;
  visible: boolean;
};

export const ProductsPagination: FC<ProductsPaginationProps> = ({
  setPageNumber,
  pageNumber,
  getLastPage,
  isLoading,
  visible,
}) => {
  const isLastPage = getLastPage();

  const paginationNPrevLinkHandle = () => {
    setPageNumber((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  const paginationNextLinkHandle = () => {
    setPageNumber((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`py-6 ${!visible && 'hidden'} `}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {pageNumber === 1 ? (
              <PaginationPrevious className="text-neutral-400 hover:bg-transparent hover:text-neutral-400" />
            ) : (
              <PaginationPrevious
                onClick={paginationNPrevLinkHandle}
                className="cursor-pointer"
              />
            )}
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={pageNumber === pageNumber}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>{/* <PaginationEllipsis /> */}</PaginationItem>
          <PaginationItem>
            {isLastPage || isLoading ? (
              <PaginationNext className="text-neutral-400 hover:bg-transparent hover:text-neutral-400" />
            ) : (
              <PaginationNext
                onClick={paginationNextLinkHandle}
                className="cursor-pointer"
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
