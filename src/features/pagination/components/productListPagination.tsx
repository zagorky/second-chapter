import { Button } from '~components/ui/button/button';
import { ITEMS_PER_PAGE } from '~config/constant';
import { useSyncQueryParameters } from '~hooks/useSyncQueryParameters';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '~/components/ui/pagination';

export const ProductListPagination = ({ total }: { total: number }) => {
  const [searchParameters] = useSearchParams();
  const { updateURLParameters } = useSyncQueryParameters();
  const currentPage = Number(searchParameters.get('page') ?? '1');

  const setPage = (page: number) => {
    updateURLParameters({ page: page });
  };
  const { totalPages, visiblePages } = useMemo(() => {
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    const visiblePages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return { totalPages, visiblePages };
  }, [total]);

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
              if (currentPage > 1) {
                setPage(currentPage - 1);
              }
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
              if (currentPage < totalPages) {
                setPage(currentPage + 1);
              }
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
