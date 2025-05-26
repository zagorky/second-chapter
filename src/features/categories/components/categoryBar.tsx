import type { ProductProjection } from '@commercetools/platform-sdk';

import { CategoryList } from '~features/categories/components/categoryList';
import { buildCategoriesMap, buildCategoriesTree } from '~features/categories/utils/buildCategories';

type CategoriesBarProps = {
  products: ProductProjection[] | undefined;
};

export const CategoryBar = ({ products }: CategoriesBarProps) => {
  const categoriesTree = buildCategoriesTree(buildCategoriesMap(products));

  return (
    <div>
      <h2>Category</h2>
      <CategoryList categories={categoriesTree} />
    </div>
  );
};
