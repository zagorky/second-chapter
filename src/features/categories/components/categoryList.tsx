import type { CategoryInfo } from '~features/categories/utils/buildCategories';

import { CategoryItem } from '~features/categories/components/categoryItem';
import { useSearchParams } from 'react-router';

type CategoryTreeProps = {
  categories: CategoryInfo[];
};

export const CategoryList = ({ categories }: CategoryTreeProps) => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const handleOnClick = (category: string, subcategory: string) => {
    const newParameter = new URLSearchParams(searchParameters.toString());

    newParameter.delete('subcategory');
    newParameter.delete('category');
    newParameter.set('category', category);
    newParameter.set('subcategory', subcategory);
    setSearchParameters(newParameter);
  };

  return (
    <ul className="flex flex-1 flex-col">
      {categories.map((category) => (
        <li className="text-sm" key={category.name}>
          {category.children.length > 0 ? (
            <CategoryItem category={category} />
          ) : (
            <button
              type="button"
              onClick={() => {
                handleOnClick(category.parentId ?? '', category.id);
              }}
              className="hover:bg-background/80 w-full cursor-pointer rounded-sm p-2 text-left"
            >
              {category.name} ({category.count})
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
