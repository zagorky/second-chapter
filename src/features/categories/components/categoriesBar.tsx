import type { ProductProjection } from '@commercetools/platform-sdk';
import type { CategoryInfo } from '~features/categories/utils/buildCategories';

import { Button } from '~components/ui/button/button';
import { Card, CardHeader, CardTitle } from '~components/ui/card';
import { buildCategoriesMap, buildCategoriesTree } from '~features/categories/utils/buildCategories';
import { useSearchParams } from 'react-router';

type CategoriesBarProps = {
  products: ProductProjection[] | undefined;
};

export const CategoriesBar = ({ products }: CategoriesBarProps) => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const categoriesTree = buildCategoriesTree(buildCategoriesMap(products));

  const handleOnClick = (value: string) => {
    const newParameter = new URLSearchParams(searchParameters.toString());

    newParameter.set('categories', value);
    setSearchParameters(newParameter);
  };

  const renderCategories = (categories: CategoryInfo[]) => {
    return (
      <ul>
        {categories.map((category) => (
          <li key={category.name}>
            <Button
              onClick={() => {
                handleOnClick(category.name);
              }}
            >
              {category.name} ({category.count})
            </Button>
            {category.children.length > 0 && renderCategories(category.children)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      {renderCategories(categoriesTree)}
    </Card>
  );
};
