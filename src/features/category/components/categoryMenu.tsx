import type { CategoryNode } from '~features/category/utils/buildCategories';

import { useCategoryData } from '~features/category/hooks/useCategoryData';
import { useSearchParams } from 'react-router';

import { Button } from '~/components/ui/button/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';

export const CategoryMenu = () => {
  const { categories } = useCategoryData();

  const [searchParameters, setSearchParameters] = useSearchParams();

  const handleClick = (category: CategoryNode) => {
    const newParameter = new URLSearchParams(searchParameters);

    if (category.parent === '') {
      newParameter.set('category', category.id);
      newParameter.delete('subcategory');
    } else {
      newParameter.set('category', category.parent);
      newParameter.set('subcategory', category.id);
    }

    setSearchParameters(newParameter);
  };

  const handleClickAll = () => {
    const newParameter = new URLSearchParams(searchParameters);

    newParameter.delete('category');
    newParameter.delete('subcategory');
    setSearchParameters(newParameter);
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button className="capitalize">Categories</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Genres</DrawerTitle>
          <DrawerDescription className="sr-only">Genres</DrawerDescription>
        </DrawerHeader>
        <ul className="overflow-y-auto px-4 text-left text-sm">
          <li key="all-books">
            <DrawerClose asChild>
              <Button
                className="hover:bg-main/60 mb-4 w-full cursor-pointer justify-start text-lg leading-normal font-bold capitalize"
                onClick={handleClickAll}
                variant="ghost"
              >
                All Books
              </Button>
            </DrawerClose>
          </li>
          {categories.map((category) => (
            <div key={category.id}>
              <li>
                <DrawerClose asChild>
                  <Button
                    className="hover:bg-main/60 mb-4 w-full cursor-pointer justify-start text-lg leading-normal font-bold capitalize"
                    onClick={() => {
                      handleClick(category);
                    }}
                    variant="ghost"
                  >
                    {category.name}
                  </Button>
                </DrawerClose>
              </li>
              {category.children.length > 0 &&
                category.children.map((child) => (
                  <li key={child.id} className="ml-4">
                    <DrawerClose asChild>
                      <Button
                        className="hover:bg-main/60 text-ьв mb-4 w-full cursor-pointer justify-start leading-normal capitalize"
                        onClick={() => {
                          handleClick(child);
                        }}
                        variant="ghost"
                      >
                        {child.name}
                      </Button>
                    </DrawerClose>
                  </li>
                ))}
            </div>
          ))}
        </ul>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="neutral">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
