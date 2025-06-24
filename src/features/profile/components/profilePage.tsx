import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '~components/ui/form/form';
import { Spinner } from '~components/ui/spinner/spinner';
import { ChangePasswordForm } from '~features/change-password/components/changePasswordForm';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import type { ProfileDataShema } from '~/features/sign-up/types/types';

import { ProfileAvatar } from '~/components/ui/avatarImage/imageAvatar';
import { Card, CardContent } from '~/components/ui/card';
import { CancelButton, EditButton, SaveButton } from '~/components/ui/edit-mode/editModeButton';
import { StyledDatePicker } from '~/components/ui/form-fields/datePicker';
import { EmailField } from '~/components/ui/form-fields/emailField';
import { FirstnameField } from '~/components/ui/form-fields/firstnameField';
import { LastnameField } from '~/components/ui/form-fields/lastnameField';
import { profileSchema } from '~/features/sign-up/types/shemas';
import { cn } from '~/lib/utilities';

import { useUpdateProfileData } from '../hooks/useUpdateProfileData';

const getAvatarByUserId = (userId: string | undefined): string => {
  const avatarImages = ['binja.png', 'kura.png', 'popique.png'];
  const DIVISOR = 10;

  if (!userId || userId.length === 0) return avatarImages[0];

  const lastChar = userId[userId.length - 1];
  const charCode = (lastChar.codePointAt(0) ?? 0) % DIVISOR;

  const GROUPS_COUNT = 3;
  const group = (charCode % GROUPS_COUNT) + 1;

  return avatarImages[group - 1];
};

export function ProfileForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const { profileData, updateProfileData } = useUpdateProfileData();

  const userAvatar = getAvatarByUserId(profileData?.id);

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
        <Card className="relative mb-15 h-[200px] bg-[url(/profile-bg-transparent.svg)] bg-cover bg-center bg-no-repeat">
          <CardContent className="absolute -bottom-15">
            <div className="flex gap-5 md:gap-10">
              <div>
                <ProfileAvatar imageUrl={userAvatar} />
              </div>
              <div className="flex flex-row justify-end truncate max-md:flex-col md:items-end md:gap-5">
                <span className="heading-2 block truncate">{profileData.firstName}</span>
                <span className="heading-2 block truncate">{profileData.lastName}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardContent>
              <Form {...form}>
                <form className="space-y-8" onSubmit={(event) => void form.handleSubmit(handleSaveClick)(event)}>
                  <h2 className="text-left text-xl md:text-2xl">Profile Information</h2>
                  <div className="flex flex-col gap-6">
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
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <ChangePasswordForm />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className={className} {...props}>
      {renderContent()}
    </div>
  );
}
