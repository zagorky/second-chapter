import { zodResolver } from '@hookform/resolvers/zod';
import { parseApiErrorMessage } from '~app/API/utils/parseApiErrorMessage';
import { EmailField } from '~components/ui/form-fields/emailField';
import { FirstnameField } from '~components/ui/form-fields/firstnameField';
import { LastnameField } from '~components/ui/form-fields/lastnameField';
import { PasswordField } from '~components/ui/form-fields/passwordField';
import { Form } from '~components/ui/form/form';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

import type { CustomCustomerAddress, CustomCustomerDraft } from '~/app/API/types/customCustomerDraft';

import { Button } from '~/components/ui/button/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Checkbox } from '~/components/ui/checkbox';
import { StyledDatePicker } from '~/components/ui/form-fields/datePicker';
import { Spinner } from '~/components/ui/spinner/spinner';
import { navigationRoutes } from '~/config/navigation';
import { registrationSchema } from '~/features/sign-up/types/shemas';
import { cn } from '~/lib/utilities';
import { withDataTestId } from '~/utils/helpers';

import type { RegistrationFormSchema } from '../types/types';

import { useSignupCustomer } from '../hooks/useSignUp';
import { AddressForm } from './addressForm';

export function SignUpForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { signupCustomer, isLoading } = useSignupCustomer();
  const navigate = useNavigate();

  const form = useForm<RegistrationFormSchema>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      dateOfBirth: '',
      email: '',
      password: '',
      streetShipping: '',
      cityShipping: '',
      postalCodeShipping: '',
      streetBilling: undefined,
      cityBilling: undefined,
      postalCodeBilling: undefined,
      countryShipping: undefined,
      countryBilling: undefined,
      shippingIsDefaultShipping: false,
      shippingIsDefaultBilling: false,
      billingIsDefaultBilling: false,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleSubmit = async (data: RegistrationFormSchema) => {
    const addresses: CustomCustomerAddress[] = [
      {
        country: data.countryShipping,
        city: data.cityShipping,
        streetName: data.streetShipping,
        postalCode: data.postalCodeShipping,
      },
    ];

    if (
      !data.shippingIsDefaultBilling &&
      data.countryBilling &&
      data.cityBilling &&
      data.streetBilling &&
      data.postalCodeBilling
    ) {
      addresses.push({
        country: data.countryBilling,
        city: data.cityBilling,
        streetName: data.streetBilling,
        postalCode: data.postalCodeBilling,
      });
    }

    const customerDraft: CustomCustomerDraft = {
      email: data.email,
      password: data.password,
      firstName: data.firstname,
      lastName: data.lastname,
      dateOfBirth: data.dateOfBirth.split('T')[0],
      addresses,
      defaultBillingAddress: data.billingIsDefaultBilling ? 1 : undefined,
      defaultShippingAddress: data.shippingIsDefaultShipping ? 0 : undefined,
      billingAddresses: [data.shippingIsDefaultBilling ? 0 : 1],
      shippingAddresses: [0],
    };

    const result = await signupCustomer(customerDraft);

    if (result.success) {
      toast.success(`All set, ${result.customer?.firstName ?? 'friend'}! The shelves are now yours to explore.`);
      void navigate(navigationRoutes.main.path);
    } else {
      const parsedMessage = parseApiErrorMessage(result.error);

      toast.error(parsedMessage);
    }
  };

  const isShippingIsDefaultBilling = form.watch('shippingIsDefaultBilling');

  return (
    <div className={cn('flex w-[calc(100%-32px)] max-w-full flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Enter your details to create your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={(event) => void form.handleSubmit(handleSubmit)(event)}>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:flex-row">
                  <FirstnameField />
                  <LastnameField />
                  <StyledDatePicker name="dateOfBirth" label="Date of birth" />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <EmailField />
                  <PasswordField />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="grow">
                    <AddressForm
                      streetPrefix="streetShipping"
                      cityPrefix="cityShipping"
                      postalCodePrefix="postalCodeShipping"
                      countryPrefix="countryShipping"
                      control={form.control}
                      title="Shipping Address"
                    />
                    <div className="checkbox-wrapper mb-2">
                      <Checkbox
                        id="shippingIsDefaultShipping"
                        {...form.register('shippingIsDefaultShipping')}
                        checked={form.watch('shippingIsDefaultShipping')}
                        onCheckedChange={(value) => {
                          form.setValue('shippingIsDefaultShipping', value === true, { shouldDirty: true });
                        }}
                      />
                      <label htmlFor="shippingIsDefaultShipping" className="checkbox-label">
                        Use this as my <span className="font-black">default shipping</span> address
                      </label>
                    </div>
                    <div className="checkbox-wrapper">
                      <Checkbox
                        id="shippingIsDefaultBilling"
                        {...form.register('shippingIsDefaultBilling')}
                        checked={form.watch('shippingIsDefaultBilling')}
                        onCheckedChange={(value) => {
                          form.setValue('shippingIsDefaultBilling', value === true);
                        }}
                      />
                      <label htmlFor="shippingIsDefaultBilling" className="checkbox-label">
                        Use this shipping address as my <span className="font-black">billing</span> address
                      </label>
                    </div>
                  </div>

                  {!isShippingIsDefaultBilling && (
                    <div className="grow">
                      <AddressForm
                        streetPrefix="streetBilling"
                        cityPrefix="cityBilling"
                        postalCodePrefix="postalCodeBilling"
                        countryPrefix="countryBilling"
                        control={form.control}
                        title="Billing Address"
                      />
                      <div className="checkbox-wrapper">
                        <Checkbox
                          id="billingIsDefaultBilling"
                          {...form.register('billingIsDefaultBilling')}
                          checked={form.watch('billingIsDefaultBilling')}
                          onCheckedChange={(value) => {
                            form.setValue('billingIsDefaultBilling', value === true);
                          }}
                        />
                        <label htmlFor="billingIsDefaultBilling" className="checkbox-label">
                          Use this billing address as my <span className="font-black">default billing</span> address
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <Button variant="default" className="min-w-[10rem]">
                    {isLoading ? <Spinner size="md" /> : 'Begin your journey'}
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{' '}
                <Link
                  to={navigationRoutes.login.path}
                  className="underline underline-offset-4"
                  {...withDataTestId('redirection-link')}
                >
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
