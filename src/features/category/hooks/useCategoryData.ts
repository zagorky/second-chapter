import type { Category } from '@commercetools/platform-sdk';
import type { FetchProductsParameters } from '~features/fetch-products/utils/fetchProducts';

import { fetchCategory } from '~features/category/utils/fetchCategory';
import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import useSWR from 'swr';

export const useCategoryData = (parameters?: FetchProductsParameters) => {
  const actualParameters = { expand: ['category[*]', 'ancestors[*]'], limit: 100, ...parameters };

  const { data: categories } = useSWR<Category[], Error>(actualParameters, fetchCategory);
  const categoryObjects = categories?.map((cat) => {
    const parentCategory = cat.ancestors[0]?.obj?.name[DEFAULT_STORE_LANGUAGE] ?? '';
    const name = cat.name[DEFAULT_STORE_LANGUAGE];
    const id = cat.id;

    return {
      id,
      parentCategory,
      name,
    };
  });

  return {
    categories: categoryObjects ?? [],
  };
};
