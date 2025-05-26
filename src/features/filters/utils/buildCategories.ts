import type { ProductProjection } from '@commercetools/platform-sdk';
import type { CategoryInfo } from '~features/filters/types/types';

import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';

export const buildCategoriesMap = (products: ProductProjection[]) => {
  const categoriesMap = new Map<string, CategoryInfo>();

  products.forEach((product) => {
    product.categories.forEach((categoryReference) => {
      const category = categoryReference.obj;

      if (!category?.key || !category.name[DEFAULT_STORE_LANGUAGE]) {
        return;
      }

      const id = category.id;
      const existingCategory = categoriesMap.get(id);

      categoriesMap.set(id, {
        id,
        name: category.name[DEFAULT_STORE_LANGUAGE],
        count: existingCategory ? existingCategory.count + 1 : 1,
        parentId: category.parent?.id,
        children: existingCategory?.children ?? [],
      });
    });
  });

  return categoriesMap;
};

export const buildCategoriesTree = (categoriesMap: Map<string, CategoryInfo>) => {
  const root: CategoryInfo[] = [];
  const categories = [...categoriesMap.values()];

  categories.forEach((category) => {
    if (category.parentId) {
      const parent = categoriesMap.get(category.parentId);

      if (parent) {
        parent.children.push(category);
      }
    } else {
      root.push(category);
    }
  });

  const sortCategories = (categories: CategoryInfo[]): CategoryInfo[] => {
    return categories
      .sort((a, b) => b.count - a.count)
      .map((category) => ({
        ...category,
        children: sortCategories(category.children),
      }));
  };

  return sortCategories(root);
};
