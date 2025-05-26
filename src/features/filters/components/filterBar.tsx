import type { ProductProjection } from '@commercetools/platform-sdk';

import { CategoryList } from '~features/filters/components/categoryList';
import { ConditionList } from '~features/filters/components/conditionList';
import { PriceFilter } from '~features/filters/components/priceFilter';
import { ResetButton } from '~features/filters/components/resetButton';
import { buildCategoriesMap, buildCategoriesTree } from '~features/filters/utils/buildCategories';
import { buildConditionsMap, buildConditionsTree } from '~features/filters/utils/buildConditions';

type CategoriesBarProps = {
  products: ProductProjection[];
};

export const FilterBar = ({ products }: CategoriesBarProps) => {
  const categories = buildCategoriesTree(buildCategoriesMap(products));
  const conditions = buildConditionsTree(buildConditionsMap(products));

  return (
    <div>
      <h2>Genres</h2>
      <CategoryList categories={categories} />
      <ConditionList conditions={conditions} />
      <PriceFilter />
      <ResetButton />
    </div>
  );
};
