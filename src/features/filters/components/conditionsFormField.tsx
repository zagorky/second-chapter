import type { FilterFormValues } from '~features/filters/types/types';

import { Checkbox } from '~components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { useFormContext } from 'react-hook-form';

type ConditionListProps = {
  conditions: {
    id: string;
    label: string;
    count: number;
  }[];
};

export const ConditionsFormField = ({ conditions }: ConditionListProps) => {
  const form = useFormContext<FilterFormValues>();

  return (
    <FormField
      name="conditions"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Conditions</FormLabel>
          <div className="space-y-2">
            {conditions.map(({ label, id, count }) => (
              <FormItem key={id} className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value.includes(label)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...field.value, label]);
                      } else {
                        field.onChange(field.value.filter((item: string) => item !== label));
                      }
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {label} ({count})
                </FormLabel>
              </FormItem>
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};
