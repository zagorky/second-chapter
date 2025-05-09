import { Button } from '~components/ui/button/button';
import { FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { withDataTestId } from '~utils/helpers';
import { Eye, EyeOff } from 'lucide-react';
import { useReducer } from 'react';
import { useFormContext } from 'react-hook-form';

export const PasswordField = ({ name = 'password' }: { name?: string }) => {
  const [showPassword, toggleShowPassword] = useReducer((value) => !value, false);
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <div className="relative">
            <Input
              placeholder="password"
              {...field}
              type={showPassword ? 'text' : 'password'}
              {...withDataTestId('password-input')}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={toggleShowPassword}
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
