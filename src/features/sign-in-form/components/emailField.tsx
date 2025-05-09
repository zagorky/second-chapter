import type { LoginFormType } from '~features/sign-in-form/types/types';
import type { Control } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';

export const EmailField = ({ control }: { control: Control<LoginFormType> }) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <div className="grid gap-3">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="user@example.com" {...field} type="text" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
