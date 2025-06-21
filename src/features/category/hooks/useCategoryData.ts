import type { Category } from '@commercetools/platform-sdk';
import type { FetchProductsParameters } from '~features/fetch-products/utils/fetchProducts';

import { buildCategoryTree } from '~features/category/utils/buildCategories';
import { fetchCategory } from '~features/category/utils/fetchCategory';
import useSWR from 'swr';

export const useCategoryData = (parameters?: FetchProductsParameters) => {
  const actualParameters = { expand: ['category[*]', 'ancestors[*]'], limit: 100, ...parameters };

  const { data: categories } = useSWR<Category[], Error>(actualParameters, fetchCategory);

  const categoriesTree = buildCategoryTree(categories ?? []);

  return {
    categories: categoriesTree,
  };
};
