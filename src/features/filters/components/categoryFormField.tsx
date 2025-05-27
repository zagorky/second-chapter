import type { CategoryInfo, FilterFormValues } from '~features/filters/types/types';

import { Checkbox } from '~components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { useFormContext } from 'react-hook-form';

export const CategoryFormField = ({ name, count, id }: Omit<CategoryInfo, 'children'>) => {
  const form = useFormContext<FilterFormValues>();

  return (
    <FormField
      control={form.control}
      name="genres.category"
      render={({ field }) => (
        <FormItem className="hover:bg-main/70 rounded-base border-border text-main-foreground bg-main flex items-center border-2 px-2 py-2">
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
