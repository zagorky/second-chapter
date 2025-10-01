import { navigationRoutes } from '~config/navigation';

export const getCategoryLink = (category: { id: string; parent: string }) => {
  const parameters = new URLSearchParams();

  if (category.parent === '') {
    parameters.set('category', category.id);
  } else {
    parameters.set('category', category.parent);
    parameters.set('subcategory', category.id);
  }

  return `${navigationRoutes.catalog.path}/?${parameters.toString()}`;
};
