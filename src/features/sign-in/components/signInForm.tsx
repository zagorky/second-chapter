import type { LoginFormFieldValues } from '~features/sign-in/types/types';
import type { ComponentProps } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~components/ui/card';
import { Form } from '~components/ui/form';
import { EmailField } from '~components/ui/form-fields/emailField';
import { PasswordField } from '~components/ui/form-fields/passwordField';
import { navigationRoutes } from '~config/navigation';
import { loginSchema } from '~features/sign-in/types/schemas';
import { useAuth } from '~hooks/useAuth';
import { cn } from '~lib/utilities';
import { withDataTestId } from '~utils/helpers';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

export const SignInForm = ({ className, ...props }: ComponentProps<'div'>) => {
  const { login, isLoading, error } = useAuth();
  const form = useForm<LoginFormFieldValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit: SubmitHandler<LoginFormFieldValues> = async (data) => {
    console.log('login data form submit', data);
    const loginResult = await login(data);

    console.log('loginResult', loginResult);
    if (loginResult.success) {
      console.log('Login successful', loginResult, loginResult.success);

      return;
    } else {
      console.log('Login failed', loginResult);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
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
                  {isLoading ? 'Loading...' : 'Submit'}
                </Button>
                {error instanceof Error && <div className={'h-6 w-[325px] text-red-700'}>{error.message}</div>}
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
