import type { LoginFormFieldValues } from '~features/sign-in/types/types';
import type { ComponentProps } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { parseApiErrorMessage } from '~app/API/utils/parseApiErrorMessage';
import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~components/ui/card';
import { FixedFormErrorMessage } from '~components/ui/fixedFormErrorMessage';
import { EmailField } from '~components/ui/form-fields/emailField';
import { PasswordField } from '~components/ui/form-fields/passwordField';
import { Form } from '~components/ui/form/form';
import { Spinner } from '~components/ui/spinner/spinner';
import { navigationRoutes } from '~config/navigation';
import { useAuth } from '~features/sign-in/hooks/useAuth';
import { loginSchema } from '~features/sign-in/types/schemas';
import { useFormValuesChange } from '~hooks/useFormValuesChange';
import { cn } from '~lib/utilities';
import { withDataTestId } from '~utils/helpers';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

export const SignInForm = ({ className, ...props }: ComponentProps<'div'>) => {
  const { login, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const form = useForm<LoginFormFieldValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useFormValuesChange(form, () => {
    form.clearErrors('root.authError');
  });

  const handleSubmit: SubmitHandler<LoginFormFieldValues> = async (data) => {
    logout();
    await login(data).then((result) => {
      if (result.success) {
        toast.success('Success! Welcome back!');
        void navigate(navigationRoutes.main.path);
      } else {
        form.setError('root.authError', {
          type: 'external',
          message: parseApiErrorMessage(result.error, 'Error occurred during login'),
        });
      }
    });
  };

  return (
    <div className={cn('mx-auto flex max-w-[400px] flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={(event) => void form.handleSubmit(handleSubmit)(event)} className="space-y-8">
              <div className="flex flex-col gap-6">
                <EmailField />
                <PasswordField />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Spinner size="md" /> : 'Submit'}
                </Button>
                <FixedFormErrorMessage>{form.formState.errors.root?.authError.message}</FixedFormErrorMessage>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link
                    to={navigationRoutes.signup.path}
                    className="underline underline-offset-4"
                    {...withDataTestId('redirection-link')}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
