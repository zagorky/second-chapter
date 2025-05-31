import { navigationRoutes } from '~config/navigation';

import type { CategoryLink } from './useProductCategories';

export const getCategoryUrl = (category: CategoryLink) => {
  const parameters = new URLSearchParams();

  if (category.parentId) {
    parameters.set('category', category.parentId);
    parameters.set('subcategory', category.categoryId);
  } else {
    parameters.set('category', category.categoryId);
  }

  return `${navigationRoutes.catalog.path}?${parameters.toString()}`;
};
