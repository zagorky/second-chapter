import { zodResolver } from '@hookform/resolvers/zod';
import { EmailField } from '~components/ui/form-fields/emailField';
import { FirstnameField } from '~components/ui/form-fields/firstnameField';
import { LastnameField } from '~components/ui/form-fields/lastnameField';
import { PasswordField } from '~components/ui/form-fields/passwordField';
import { Form } from '~components/ui/form/form';
import dayjs from 'dayjs';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { Button } from '~/components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { StyledDatePicker } from '~/components/ui/form-fields/datePicker';
import { registrationSchema } from '~/features/sign-up/types/shemas';
import { cn } from '~/lib/utilities';

import type { RegistrationFormFieldsValues } from '../types/types';

import { AddressForm } from './addressForm';

export function SignUpForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm<RegistrationFormFieldsValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      addressShipping: '',
      cityShipping: '',
      addressBilling: '',
      cityBilling: '',
      postalCodeShipping: '',
      dateOfBirth: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Enter your details to create your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form>
              <div className="flex flex-col gap-6">
                <FirstnameField />
                <LastnameField />

                <StyledDatePicker
                  value={form.watch('dateOfBirth') ? dayjs(form.watch('dateOfBirth')) : null}
                  onChange={(date) => {
                    form.setValue('dateOfBirth', date ? date.toISOString() : '');
                  }}
                />

                <EmailField />
                <PasswordField />

                <AddressForm
                  addressPrefix="addressShipping"
                  cityPrefix="cityShipping"
                  postalCodePrefix="postalCodeShipping"
                  title="Shipping Address"
                />
                <AddressForm
                  addressPrefix="addressBilling"
                  cityPrefix="cityBilling"
                  postalCodePrefix="postalCodeBilling"
                  title="Billing Address"
                />

                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full">
                    Create account
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link to="/signin" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
