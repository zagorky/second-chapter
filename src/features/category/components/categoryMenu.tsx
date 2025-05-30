import { useCategoryData } from '~features/category/hooks/useCategoryData';
import { useSearchParams } from 'react-router';

import { Button } from '~/components/ui/button/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';

export const CategoryMenu = () => {
  const { categories } = useCategoryData();

  const [searchParameters, setSearchParameters] = useSearchParams();
  const currentCategory = searchParameters.get('category')
    ? categories.find((category) => category.id === searchParameters.get('category'))?.name
    : '';
  const currentSubcategory = searchParameters.get('subcategory')
    ? categories.find((category) => category.id === searchParameters.get('subcategory'))?.name
    : '';

  const handleClick = (categoryID: string) => {
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

  const renderHeader = () => {
    if (currentSubcategory) {
      return currentSubcategory;
    } else if (currentCategory) {
      return currentCategory;
    } else {
      return 'Categories';
    }
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className="capitalize">{renderHeader()}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Genres</DrawerTitle>
          <DrawerDescription className="sr-only">Genres</DrawerDescription>
        </DrawerHeader>
        <ul className="overflow-y-auto px-4 text-sm">
          {categories.map((category) => (
            <li key={category.name}>
              <DrawerClose asChild>
                <Button
                  className="hover:bg-secondary-background/60 mb-4 w-full cursor-pointer text-lg leading-normal capitalize"
                  onClick={() => {
                    handleClick(category.id);
                  }}
                  variant="ghost"
                >
                  {category.name}
                </Button>
              </DrawerClose>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
};
