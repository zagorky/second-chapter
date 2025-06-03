import { buildCategoryQueryParameters } from '~features/category/utils/buildCategoryQueryParameters';
import { buildFilterQueryParameters } from '~features/filters/utils/buildFilterQueryParameters';
import { buildPaginationQueryParameters } from '~features/pagination/utils/buildPaginationQueryParameters';
import { buildSearchQueryParameters } from '~features/search/utils/buildSearchQueryParameters';
import { buildSortQueryParameters } from '~features/sort/utils/buildSortQueryParameters';

export const buildRequest = (searchParameters: URLSearchParams) => {
  const sortData = buildSortQueryParameters(searchParameters.get('sort') ?? '');
  const categoryData = buildCategoryQueryParameters(
    searchParameters.get('category') ?? '',
    searchParameters.get('subcategory') ?? ''
  );
  const searchData = buildSearchQueryParameters(searchParameters.get('search') ?? '');
  const filterData = buildFilterQueryParameters(
    searchParameters.get('conditions') ?? '',
    searchParameters.get('sale') ?? '',
    searchParameters.get('price') ?? ''
  );

  const paginationData = buildPaginationQueryParameters(searchParameters.get('page') ?? '1');

  return {
    ...categoryData,
    ...filterData,
    ...searchData,
    ...sortData,
    ...paginationData,
  };
};
