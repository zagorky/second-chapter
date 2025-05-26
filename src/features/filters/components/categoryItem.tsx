import type { CategoryInfo } from '~features/filters/utils/buildCategories';

import { Button } from '~components/ui/button/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '~components/ui/collapsible';
import { CategoryList } from '~features/filters/components/categoryList';
import { ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

type CategoryItemProps = {
  category: CategoryInfo;
};

export const CategoryItem = ({ category }: CategoryItemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchParameters, setSearchParameters] = useSearchParams();

  const handleOnClick = (value: string) => {
    const newParameter = new URLSearchParams(searchParameters.toString());

    newParameter.delete('category');
    newParameter.delete('subcategory');
    newParameter.set('category', value);
    setSearchParameters(newParameter);
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="rounded-base border-border text-main-foreground bg-main flex items-center justify-between space-x-4 border-2 px-4 py-2">
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-between text-sm"
          onClick={() => {
            handleOnClick(category.id);
          }}
        >
          {category.name} ({category.count})
        </button>
        <CollapsibleTrigger asChild>
          <Button variant="noShadow" className="bg-secondary-background text-foreground h-6 w-9 p-0">
            <ChevronsUpDown className="size-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <CategoryList categories={category.children} />
      </CollapsibleContent>
    </Collapsible>
  );
};
