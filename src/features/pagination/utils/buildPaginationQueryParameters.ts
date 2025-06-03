export const buildPaginationQueryParameters = (page: string) => {
  const currentPage = Number(page);
  const limit = 6;

  return { offset: (currentPage - 1) * limit };
};
