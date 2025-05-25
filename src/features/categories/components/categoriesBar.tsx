import { Card, CardHeader, CardTitle } from '~components/ui/card';
import { buildCategoriesMap } from '~features/categories/utils/buildCategoriesMap';
import { useProductData } from '~features/fetch-products/hooks/useProductData';
import { Link, useSearchParams } from 'react-router';

export const CategoriesBar = () => {
  const { products } = useProductData();
  const [searchParameters, setSearchParameters] = useSearchParams();

  if (!products) return null;

  const categories = [...buildCategoriesMap(products).entries()];

  const handleOnClick = (value: string) => {
    const newParameter = new URLSearchParams(searchParameters.toString());

    newParameter.set('categories', value);
    setSearchParameters(newParameter);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <ul>
        {categories.map(([id, { name, count }]) => (
          <li key={id}>
            <Link
              to={`/categories/${id}`}
              className="flex items-center gap-2"
              onClick={() => {
                handleOnClick(id);
              }}
            >
              {name} <span>{count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
};
