import { FixedFormMessage } from '~components/ui/fixedFormMessage';
import { FormControl, FormField, FormItem, FormLabel, useFormField } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { withDataTestId } from '~utils/helpers';
import { useFormContext } from 'react-hook-form';

type EmailFieldProps = {
  name?: string;
  label?: string;
  placeholder?: string;
};

export const EmailField = ({ name = 'email', label = 'Email', placeholder = 'user@example.com' }: EmailFieldProps) => {
  const form = useFormContext();
  const { formItemId } = useFormField();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="grid gap-3">
            <FormLabel htmlFor={formItemId} className={'text-left'}>
              {label}
            </FormLabel>
            <FormControl>
              <Input
                placeholder={placeholder}
                autoComplete="username"
                {...field}
                type="text"
                {...withDataTestId(`${name}-input`)}
              />
            </FormControl>
            <FixedFormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
