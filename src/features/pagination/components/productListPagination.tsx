import { Button } from '~components/ui/button/button';
import { ITEMS_PER_PAGE } from '~config/constant';
import { PAGINATION_VISIBLE_RADIUS } from '~features/pagination/config/constant';
import { useSyncQueryParameters } from '~hooks/useSyncQueryParameters';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '~/components/ui/pagination';

export const ProductListPagination = ({ total }: { total: number }) => {
  const [searchParameters] = useSearchParams();
  const { updateURLParameters } = useSyncQueryParameters();
  const currentPage = Number(searchParameters.get('page') ?? '1');

  const setPage = (page: number) => {
    updateURLParameters({ page: page });
  };
  const { totalPages, visiblePages, showStartEllipsis, showEndEllipsis } = useMemo(() => {
    const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(PAGINATION_VISIBLE_RADIUS, totalPages);
    }
    if (currentPage === totalPages) {
      startPage = Math.max(totalPages - 1, 1);
    }
    const visiblePages = [];

    for (let i = startPage; i <= endPage; i += 1) {
      visiblePages.push(i);
    }
    const showStartEllipsis = startPage > PAGINATION_VISIBLE_RADIUS;
    const showEndEllipsis = endPage < totalPages - 1;

    return { totalPages, visiblePages, showStartEllipsis, showEndEllipsis };
  }, [currentPage, total]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className="py-8">
      <PaginationContent>
        <PaginationItem>
          <Button
            size="sm"
            className="px-2"
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

        {visiblePages[0] > 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              size="sm"
              onClick={(event) => {
                event.preventDefault();
                setPage(1);
              }}
              isActive={currentPage === 1}
            >
              1
            </PaginationLink>
          </PaginationItem>
        )}

        {showStartEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              size="sm"
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

        {showEndEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {visiblePages[visiblePages.length - 1] < totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              size="sm"
              onClick={(event) => {
                event.preventDefault();
                setPage(totalPages);
              }}
              isActive={currentPage === totalPages}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            size="sm"
            className="px-2"
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
