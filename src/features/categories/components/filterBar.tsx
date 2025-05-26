import type { ProductProjection } from '@commercetools/platform-sdk';

import { CategoryList } from '~features/categories/components/categoryList';
import { ResetButton } from '~features/categories/components/resetButton';
import { buildCategoriesMap, buildCategoriesTree } from '~features/categories/utils/buildCategories';

type CategoriesBarProps = {
  products: ProductProjection[] | undefined;
};

export const FilterBar = ({ products }: CategoriesBarProps) => {
  const categoriesTree = buildCategoriesTree(buildCategoriesMap(products));

  return (
    <div>
      <h2>Genres</h2>
      <CategoryList categories={categoriesTree} />
      <ResetButton />
    </div>
  );
};
