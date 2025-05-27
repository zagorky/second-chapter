import type { CategoryInfo, FilterFormValues } from '~features/filters/types/types';

import { Checkbox } from '~components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { useFormContext } from 'react-hook-form';

export const SubCategoryFormField = ({ name, count, id }: Omit<CategoryInfo, 'children'>) => {
  const form = useFormContext<FilterFormValues>();

  return (
    <FormField
      key={id}
      control={form.control}
      name="genres.subcategory"
      render={({ field }) => (
        <FormItem className="flex items-center space-x-2">
          <FormControl>
            <Checkbox
              checked={field.value.includes(id)}
              onCheckedChange={(checked) => {
                if (checked) {
                  field.onChange([...field.value, id]);
                } else {
                  field.onChange(field.value.filter((item: string) => item !== id));
                }
              }}
            />
          </FormControl>
          <FormLabel className="cursor-pointer text-sm font-normal">
            {name} ({count})
          </FormLabel>
        </FormItem>
      )}
    />
  );
};
