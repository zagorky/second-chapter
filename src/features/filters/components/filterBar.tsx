import type { ProductProjection } from '@commercetools/platform-sdk';

import { CategoryList } from '~features/filters/components/categoryList';
import { ResetButton } from '~features/filters/components/resetButton';
import { buildCategoriesMap, buildCategoriesTree } from '~features/filters/utils/buildCategories';

type CategoriesBarProps = {
  products: ProductProjection[];
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
