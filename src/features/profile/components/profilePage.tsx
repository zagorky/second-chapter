import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '~components/ui/form/form';
import { Spinner } from '~components/ui/spinner/spinner';
import { ChangePasswordForm } from '~features/change-password/components/changePasswordForm';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import type { ProfileDataShema } from '~/features/sign-up/types/types';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { StyledDatePicker } from '~/components/ui/form-fields/datePicker';
import { EmailField } from '~/components/ui/form-fields/emailField';
import { FirstnameField } from '~/components/ui/form-fields/firstnameField';
import { LastnameField } from '~/components/ui/form-fields/lastnameField';
import { CancelButton, EditButton, SaveButton } from '~/components/ui/profile/profileButton';
import { ProfileInput } from '~/components/ui/profile/profileInput';
import { fetchCustomer } from '~/features/fetch-customers/components/customersData';
import { profileSchema } from '~/features/sign-up/types/shemas';
import { cn } from '~/lib/utilities';

type Customer = {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
};

function useCustomerData() {
  const [customer, setCustomer] = React.useState<Customer | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    fetchCustomer()
      .then((data) => {
        setCustomer(data ?? null);
        setIsLoading(false);
      })
      .catch((error: unknown) => {
        console.error(`Error loading user profile data:`, error);
      });
  }, []);

  return { customer, isLoading };
}

export function ProfileForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { customer, isLoading } = useCustomerData();
  const [isEditing, setIsEditing] = React.useState(false);

  const form = useForm<ProfileDataShema>({
    resolver: zodResolver(profileSchema),
    defaultValues: customer ?? { firstName: '', lastName: '', email: '', dateOfBirth: '' },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (customer) {
      form.reset(customer);
    }
  }, [customer, form]);

  const handleSaveClick = () => {
    if (customer) {
      form.reset(customer);
    }
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if (customer) {
      form.reset(customer);
    }
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    form.reset(customer ?? {});
    setIsEditing(false);
  };

  const renderProfileField = () => {
    return (
      <>
        <ProfileInput name="firstName" label="First Name" />
        <ProfileInput name="lastName" label="Last Name" />
        <ProfileInput name="email" label="Email Address" />
        <ProfileInput name="dateOfBirth" label="Date Of Birth" />
      </>
    );
  };

  const renderEditableField = () => {
    return (
      <>
        <FirstnameField name="firstName" />
        <LastnameField name="lastName" />
        <EmailField name="email" />
        <StyledDatePicker name="dateOfBirth" label="Date of birth" />
      </>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <Spinner className="m-auto" size="xl" />;
    }

    return (
      <div className={cn('flex w-[calc(100%-32px)] max-w-full flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={(event) => void form.handleSubmit(handleSaveClick)(event)}>
                <div className="flex flex-col gap-6">
                  {isEditing ? renderEditableField() : renderProfileField()}
                  {isEditing ? (
                    <div className="flex gap-4">
                      <SaveButton />
                      <CancelButton onClick={handleCancelClick} />
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <EditButton onClick={handleEditClick} />
                    </div>
                  )}
                </div>
              </form>
            </Form>
            <ChangePasswordForm />
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className={className} {...props}>
      {renderContent()}
    </div>
  );
}
