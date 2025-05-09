import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { withDataTestId } from '~utils/helpers';
import { useFormContext } from 'react-hook-form';

type EmailFieldType = {
  name?: string;
  label?: string;
  placeholder?: string;
};

export const EmailField = ({ name = 'email', label = 'Email', placeholder = 'user@example.com' }: EmailFieldType) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="grid gap-3">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} type="text" {...withDataTestId(`${name}-input`)} />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
