import type { CategoryInfo, FilterFormValues } from '~features/filters/types/types';

import { FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { CategoryFormField } from '~features/filters/components/categoryFormField';
import { SubCategoryFormField } from '~features/filters/components/subCategoryFormField';
import { useFormContext } from 'react-hook-form';

type CategoryTreeProps = {
  categories: CategoryInfo[];
};

export const GenresFormField = ({ categories }: CategoryTreeProps) => {
  const form = useFormContext<FilterFormValues>();

  return (
    <FormField
      control={form.control}
      name="genres"
      render={() => (
        <FormItem>
          <FormLabel>Categories</FormLabel>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id}>
                <CategoryFormField name={category.name} id={category.id} count={category.count} />
                {category.children.length > 0 && (
                  <div className="mt-2 ml-4 space-y-2">
                    {category.children.map((subcategory) => (
                      <SubCategoryFormField
                        key={subcategory.name}
                        count={subcategory.count}
                        id={subcategory.id}
                        name={subcategory.name}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};
