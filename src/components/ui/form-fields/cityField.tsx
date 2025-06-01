import { FixedFormErrorMessage } from '~components/ui/fixedFormErrorMessage';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Input } from '~components/ui/input';
import { withDataTestId } from '~utils/helpers';
import { useFormContext } from 'react-hook-form';

type CityFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
};

export const CityField = ({ name, label = 'City', placeholder = 'London', readOnly = false }: CityFieldProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grow">
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
                readOnly={readOnly}
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
