import { FixedFormErrorMessage } from '~components/ui/fixedFormErrorMessage';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Input } from '~components/ui/input';
import { withDataTestId } from '~utils/helpers';
import { useFormContext } from 'react-hook-form';

type AddressFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
};

export const PostalCodeField = ({
  name,
  label = 'Postal Code',
  placeholder = 'NW8 9AY',
  readOnly = false,
}: AddressFieldProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="form-field-input-wrapper">
            <FormLabel htmlFor={name} className={'text-left'}>
              {label}
            </FormLabel>
            <div className="form-field-input-wrapper">
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
          </div>
        </FormItem>
      )}
    />
  );
};
