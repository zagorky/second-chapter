import type { FilterFormValues } from '~features/filters/types/types';

import { Checkbox } from '~components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { withDataTestId } from '~utils/helpers';
import { useFormContext } from 'react-hook-form';

type ConditionListProps = {
  conditions: {
    id: string;
    label: string;
  }[];
};

export const ConditionsFormField = ({ conditions }: ConditionListProps) => {
  const form = useFormContext<FilterFormValues>();

  return (
    <FormField
      {...withDataTestId('conditions-form-field')}
      name="conditions"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md">Condition</FormLabel>
          <div className="grid items-center justify-start gap-x-4 gap-y-2 md:p-0">
            {conditions.map(({ label, id }) => (
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
                <FormLabel className="text-sm font-normal">{label}</FormLabel>
              </FormItem>
            ))}
          </div>
        </FormItem>
      )}
    />
  );
};
