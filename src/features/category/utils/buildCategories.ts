import type { Category } from '@commercetools/platform-sdk';

import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import { assertIsNonNullable } from '~utils/helpers';

export type CategoryNode = {
  id: string;
  name: string;
  parent: string;
  children: CategoryNode[];
};

export const buildCategoryTree = (categories: Category[]) => {
  const categoryMap = new Map<string, CategoryNode>();
  const root: CategoryNode[] = [];

  categories.forEach((category) => {
    categoryMap.set(category.id, {
      id: category.id,
      name: category.name[DEFAULT_STORE_LANGUAGE] ?? '',
      parent: category.parent?.id ?? '',
      children: [],
    });
  });

  categories.forEach((category) => {
    const node = categoryMap.get(category.id);

    assertIsNonNullable(node);
    if (category.parent?.id) {
      const parent = categoryMap.get(category.parent.id);

      if (parent) {
        parent.children.push(node);
      }
    } else {
      root.push(node);
    }
  });

  return root;
};
