import type { LoginFormFieldValues } from '~features/sign-in/types/types';
import type { ComponentProps } from 'react';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~components/ui/card';
import { EmailField } from '~components/ui/form-fields/emailField';
import { PasswordField } from '~components/ui/form-fields/passwordField';
import { Form } from '~components/ui/form/form';
import { navigationRoutes } from '~config/navigation';
import { useAuth } from '~features/sign-in/hooks/useAuth';
import { loginSchema } from '~features/sign-in/types/schemas';
import { cn } from '~lib/utilities';
import { withDataTestId } from '~utils/helpers';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';

export const SignInForm = ({ className, ...props }: ComponentProps<'div'>) => {
  const { login, isLoading, errorAuth, setErrorAuth, logout } = useAuth();
  const form = useForm<LoginFormFieldValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    const subscribe = form.watch(() => {
      if (errorAuth) {
        setErrorAuth(null);
      }
    });

    return () => {
      subscribe.unsubscribe();
    };
  }, [errorAuth, form, setErrorAuth]);

  const handleSubmit: SubmitHandler<LoginFormFieldValues> = async (data) => {
    logout();
    const result = await login(data);

    if (result.success) {
      toast.success('Success! Welcome back!');
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
                <div className="h-6 w-[325px]">
                  {errorAuth instanceof Error && <div className="text-red-500">{errorAuth.message}</div>}
                </div>
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
