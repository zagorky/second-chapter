import { FixedFormErrorMessage } from '~components/ui/fixedFormErrorMessage';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Input } from '~components/ui/input';
import { withDataTestId } from '~utils/helpers';
import { useFormContext } from 'react-hook-form';

type LastnameFieldProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  isReadOnly?: boolean;
};

export const LastnameField = ({
  name = 'lastname',
  label = 'Last Name',
  placeholder = 'Last Name',
  isReadOnly = false,
}: LastnameFieldProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
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
                  readOnly={isReadOnly}
                  {...field}
                  type="text"
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
