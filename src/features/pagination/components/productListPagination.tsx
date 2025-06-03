import { Button } from '~components/ui/button/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '~/components/ui/pagination';

export const ProductListPagination = ({ total, limit }: { total: number; limit: number }) => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const currentPage = Number(searchParameters.get('page') ?? '1');

  const totalPages = useMemo(() => {
    return Math.ceil(total / limit);
  }, [total, limit]);

  const setPage = useCallback(
    (page: number) => {
      const newParameters = new URLSearchParams(searchParameters);

      newParameters.set('page', String(page));
      setSearchParameters(newParameters);
    },
    [searchParameters, setSearchParameters]
  );

  const visiblePages = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }, [totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="p-8">
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={(event) => {
              event.preventDefault();
              if (currentPage > 1) setPage(currentPage - 1);
            }}
            disabled={currentPage <= 1}
          >
            <ChevronLeft />
          </Button>
        </PaginationItem>

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              onClick={(event) => {
                event.preventDefault();
                setPage(page);
              }}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            onClick={(event) => {
              event.preventDefault();
              if (currentPage < totalPages) setPage(currentPage + 1);
            }}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
