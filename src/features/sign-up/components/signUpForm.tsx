import { zodResolver } from '@hookform/resolvers/zod';
import { EmailField } from '~components/ui/form-fields/emailField';
import { FirstnameField } from '~components/ui/form-fields/firstnameField';
import { LastnameField } from '~components/ui/form-fields/lastnameField';
import { PasswordField } from '~components/ui/form-fields/passwordField';
import { Form } from '~components/ui/form/form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import { Button } from '~/components/ui/button/button';
import { Calendar } from '~/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { registrationSchema } from '~/features/sign-up/types/shemas';
import { cn } from '~/lib/utilities';

import type { RegistrationFormFieldsValues } from '../types/types';

import { AddressForm } from './addressForm';

export function SignUpForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [date, setDate] = React.useState<Date>();
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

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="noShadow" className="font-base w-[280px] justify-start text-left">
                      <CalendarIcon />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto border-0! p-0">
                    <Calendar className="bg-primary" mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>

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
