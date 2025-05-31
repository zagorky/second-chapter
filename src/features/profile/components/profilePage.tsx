import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '~components/ui/form/form';
import { Spinner } from '~components/ui/spinner/spinner';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import type { ProfileDataShema } from '~/features/sign-up/types/types';

import { Button } from '~/components/ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { FirstnameField } from '~/components/ui/form-fields/firstnameField';
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

  const handleSaveClick = (data: ProfileDataShema) => {
    console.log('Save data:', data);
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
                  {isEditing ? <FirstnameField name="firstName" /> : <h2>First Name: {customer?.firstName}</h2>}
                  {isEditing ? (
                    <div className="flex gap-4">
                      <Button type="submit">Save</Button>
                      <Button type="button" onClick={handleCancelClick}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button type="button" onClick={handleEditClick}>
                      Edit
                    </Button>
                  )}
                </div>
              </form>
            </Form>
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
