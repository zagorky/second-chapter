import { FixedFormErrorMessage } from '~components/ui/fixedFormErrorMessage';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Input } from '~components/ui/input';
import { withDataTestId } from '~utils/helpers';
import { useFormContext } from 'react-hook-form';

type StreetFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
};

export const StreetField = ({
  name,
  label = 'Street',
  placeholder = 'Abbey Road',
  readOnly = false,
}: StreetFieldProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grow">
          <div className="form-field-wrapper">
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
