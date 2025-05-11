import { Button } from '~components/ui/button/button';
import { FixedFormMessage } from '~components/ui/fixedFormMessage';
import { FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Input } from '~components/ui/input';
import { withDataTestId } from '~utils/helpers';
import { Eye, EyeOff } from 'lucide-react';
import { useReducer } from 'react';
import { useFormContext } from 'react-hook-form';

type PasswordFieldProps = {
  name?: string;
  label?: string;
  placeholder?: string;
};

export const PasswordField = ({
  name = 'password',
  label = 'Password',
  placeholder = 'password',
}: PasswordFieldProps) => {
  const [showPassword, toggleShowPassword] = useReducer((value) => !value, false);

  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={'text-left'}>{label}</FormLabel>
          <div className={'relative'}>
            <Input
              placeholder={placeholder}
              {...field}
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              {...withDataTestId(`${name}-input`)}
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
          <FixedFormMessage />
        </FormItem>
      )}
    />
  );
};
