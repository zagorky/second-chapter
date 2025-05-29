import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useCategoryData } from '~features/category/hooks/useCategoryData';
import { useSearchParams } from 'react-router';

import { Button } from '~/components/ui/button/button';
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '~/components/ui/dropdownMenu';

export const CategoryMenu = () => {
  const { categories } = useCategoryData();

  const [searchParameters, setSearchParameters] = useSearchParams();
  const currentCategory = searchParameters.get('category')
    ? categories.find((category) => category.id === searchParameters.get('category'))?.name
    : '';
  const currentSubcategory = searchParameters.get('subcategory')
    ? categories.find((category) => category.id === searchParameters.get('subcategory'))?.name
    : '';

  const onSelect = (categoryID: string) => {
    const newParameter = new URLSearchParams(searchParameters);
    const selectedCategory = categories.find((category) => category.id === categoryID);
    const isSubcategory = selectedCategory?.parentCategory !== '';

    if (isSubcategory) {
      newParameter.set('subcategory', categoryID);
    } else {
      newParameter.set('category', categoryID);
      newParameter.delete('subcategory');
    }

    setSearchParameters(newParameter);
  };

  const filteredCategories = currentCategory
    ? categories.filter((category) => category.parentCategory === currentCategory)
    : categories.filter((category) => category.parentCategory === '');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="noShadow">Genres</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel inset>{currentCategory}</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={currentCategory ?? currentSubcategory ?? ''} onValueChange={onSelect}>
            {filteredCategories.map((category) => (
              <DropdownMenuRadioItem key={category.id} value={category.id}>
                {category.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
