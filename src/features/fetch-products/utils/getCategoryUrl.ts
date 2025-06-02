import type { CategoryLink } from '~features/fetch-products/hooks/useProductCategories';

import { navigationRoutes } from '~config/navigation';

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
