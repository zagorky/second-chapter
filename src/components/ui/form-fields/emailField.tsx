import { FixedFormErrorMessage } from '~components/ui/fixedFormErrorMessage';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { withDataTestId } from '~utils/helpers';
import { useFormContext } from 'react-hook-form';

import { Input } from '~/components/ui/input';

type EmailFieldProps = {
  name?: string;
  label?: string;
  placeholder?: string;
  isReadOnly?: boolean;
};

export const EmailField = ({
  name = 'email',
  label = 'Email',
  placeholder = 'user@example.com',
  isReadOnly = false,
}: EmailFieldProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="grow">
          <div className="form-field-wrapper">
            <FormLabel className={'text-left'}>{label}</FormLabel>
            <div className="form-field-input-wrapper">
              <FormControl>
                <Input
                  placeholder={placeholder}
                  autoComplete="username"
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
