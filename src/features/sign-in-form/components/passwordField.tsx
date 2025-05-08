import type { LoginFormType } from '~features/sign-in-form/types/types';
import type { Control } from 'react-hook-form';

import { Button } from '~components/ui/button/button';
import { FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export const PasswordField = ({ control }: { control: Control<LoginFormType> }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <div className="relative">
            <Input placeholder="password" {...field} type={showPassword ? 'text' : 'password'} />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
