import { navigationRoutes } from '~config/navigation';
import { useCategoryData } from '~features/category/hooks/useCategoryData';
import { useLocation, useSearchParams } from 'react-router';

export const useBreadcrumbs = () => {
  const location = useLocation();
  const { categories } = useCategoryData();
  const [searchParameters] = useSearchParams();
  const categoryId = searchParameters.get('category');
  const subcategoryId = searchParameters.get('subcategory');
  const currentCategory = categories.find((category) => category.id === categoryId);
  const currentSubcategory = currentCategory?.children.find((category) => category.id === subcategoryId);
  const pathname = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment, i, array) => ({
      name: segment,
      path: `/${array.slice(0, i + 1).join('/')}`,
    }));

  const breadcrumbs = [{ name: navigationRoutes.main.title, path: navigationRoutes.main.path }, ...pathname];

  if (currentCategory) {
    breadcrumbs.push({
      name: currentCategory.name,
      path: `${navigationRoutes.catalog.path}?category=${currentCategory.id}`,
    });

    if (currentSubcategory) {
      breadcrumbs.push({
        name: currentSubcategory.name,
        path: `${navigationRoutes.catalog.path}?category=${currentCategory.id}&subcategory=${currentSubcategory.id}`,
      });
    }
  }

  return breadcrumbs;
};
