import type { ProductProjection } from '@commercetools/platform-sdk';

import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';

export const buildCategoriesMap = (products: ProductProjection[]) => {
  const categoriesMap = new Map<string, { name: string; count: number }>();

  products.forEach((product) => {
    product.categories.forEach((categoryReference) => {
      const category = categoryReference.obj;

      if (!category?.key || !category.name[DEFAULT_STORE_LANGUAGE]) {
        return;
      }

      const id = category.key;
      const name = category.name[DEFAULT_STORE_LANGUAGE];
      const existingCategory = categoriesMap.get(id);

      if (existingCategory) {
        existingCategory.count += 1;
      } else {
        categoriesMap.set(id, { name, count: 1 });
      }
    });
  });

  return categoriesMap;
};
