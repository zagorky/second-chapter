import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '~components/ui/form/form';
import { Spinner } from '~components/ui/spinner/spinner';
import { ChangePasswordForm } from '~features/change-password/components/changePasswordForm';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import type { ProfileDataShema } from '~/features/sign-up/types/types';

import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { CancelButton, EditButton, SaveButton } from '~/components/ui/edit-mode/editModeButton';
import { StyledDatePicker } from '~/components/ui/form-fields/datePicker';
import { EmailField } from '~/components/ui/form-fields/emailField';
import { FirstnameField } from '~/components/ui/form-fields/firstnameField';
import { LastnameField } from '~/components/ui/form-fields/lastnameField';
import { profileSchema } from '~/features/sign-up/types/shemas';
import { cn } from '~/lib/utilities';

import { useUpdateProfileData } from '../hooks/useUpdateProfileData';

export function ProfileForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const { profileData, updateProfileData } = useUpdateProfileData();

  const form = useForm<ProfileDataShema>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileData ?? { firstName: '', lastName: '', email: '', dateOfBirth: '' },
    mode: 'onChange',
  });

  React.useEffect(() => {
    if (profileData) {
      form.reset(profileData);
    }
  }, [profileData, form]);

  const handleSaveClick = async () => {
    try {
      setIsSaving(true);
      const values = form.getValues();

      await updateProfileData(values);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    form.reset();
    setIsEditing(false);
  };

  const renderFields = () => {
    return (
      <>
        <FirstnameField name="firstName" isReadOnly={!isEditing} />
        <LastnameField name="lastName" isReadOnly={!isEditing} />
        <EmailField name="email" isReadOnly={!isEditing} />
        <StyledDatePicker name="dateOfBirth" label="Date of birth" isReadOnly={!isEditing} />
      </>
    );
  };

  const renderContent = () => {
    if (!profileData) {
      return <Spinner className="m-auto" size="xl" />;
    }

    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={(event) => void form.handleSubmit(handleSaveClick)(event)}>
                <div className="flex justify-end space-x-2">
                  {isEditing ? (
                    <>
                      <CancelButton onClick={handleCancelClick} />
                      <SaveButton disabled={isSaving} isSaving={isSaving} />
                    </>
                  ) : (
                    <EditButton onClick={handleEditClick} />
                  )}
                </div>
                <div className="flex flex-col gap-6">{renderFields()}</div>
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
