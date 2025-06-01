import { FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Input } from '~components/ui/input';
import { useFormContext } from 'react-hook-form';

import { withDataTestId } from '~/utils/helpers';

export const ProfileInput = ({ name = '', label = '' }) => {
  const { control } = useFormContext();

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <div className="grid gap-3">
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input {...field} readOnly={true} {...withDataTestId(`${name}-input`)} />
          </div>
        </FormItem>
      )}
    />
  );
};
