import type { LoginFormType } from '~features/sign-in-form/types/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~components/ui/card';
import { Form } from '~components/ui/form';
import { EmailField } from '~features/sign-in-form/components/emailField';
import { PasswordField } from '~features/sign-in-form/components/passwordField';
import { loginSchema } from '~features/sign-in-form/types/types';
import { cn } from '~lib/utilities';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

export const SignInForm = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = () => {
    console.error('login form submit', form);
    form.reset();
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
                <EmailField control={form.control} />
                <PasswordField control={form.control} />
                <Button type="submit" className="w-full">
                  Submit
                </Button>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link to="/signup" className="underline underline-offset-4">
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
