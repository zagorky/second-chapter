import { FixedFormErrorMessage } from '~components/ui/fixedFormErrorMessage';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Input } from '~components/ui/input';
import { withDataTestId } from '~utils/helpers';
import { useFormContext } from 'react-hook-form';

type AddressFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
};

export const AddressField = ({ name, label = 'Address', placeholder = 'Abbey Road' }: AddressFieldProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="grid gap-3">
            <FormLabel htmlFor={name} className={'text-left'}>
              {label}
            </FormLabel>
            <FormControl>
              <Input
                id={name}
                placeholder={placeholder}
                autoComplete={name}
                {...field}
                type="text"
                {...withDataTestId(`${name}-input`)}
              />
            </FormControl>
            <FixedFormErrorMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
