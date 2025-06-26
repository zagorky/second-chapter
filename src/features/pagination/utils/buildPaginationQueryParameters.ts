import { ITEMS_PER_PAGE } from '~/config/constants';

export const buildPaginationQueryParameters = (page: string) => {
  const currentPage = Number(page);
  const safePage = Number.isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

  return { offset: (safePage - 1) * ITEMS_PER_PAGE };
};
