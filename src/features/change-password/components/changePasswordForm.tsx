import type { SubmitHandler } from 'react-hook-form';
import type { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/ui/button/button';
import { FixedFormErrorMessage } from '~components/ui/fixedFormErrorMessage';
import { PasswordField } from '~components/ui/form-fields/passwordField';
import { Form } from '~components/ui/form/form';
import { Spinner } from '~components/ui/spinner/spinner';
import { useChangePassword } from '~features/change-password/hooks/useChangePassword';
import { changePasswordSchema } from '~features/change-password/types/schemas';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { CancelButton, SaveButton } from '~/components/ui/profile/profileButton';

export const ChangePasswordForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { changePassword, isLoading } = useChangePassword();
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSubmit: SubmitHandler<z.infer<typeof changePasswordSchema>> = async (data) => {
    try {
      setIsSaving(true);
      setIsEditing(false);
      await changePassword(data.currentPassword, data.newPassword);
      form.reset();
    } catch (error) {
      console.error('Failed to update password:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
    setIsSaving(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={(event) => void form.handleSubmit(handleSubmit)(event)} className="space-y-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-end space-x-2">
            {isEditing ? (
              <>
                <CancelButton onClick={handleCancel} />
                <SaveButton disabled={isSaving} />
              </>
            ) : (
              <Button variant="neutral" size="sm" onClick={handleEdit} type="button" disabled={isLoading}>
                {isLoading ? <Spinner size="md" /> : 'edit'}
              </Button>
            )}
          </div>
          <PasswordField name="currentPassword" label="Current password" readOnly={!isEditing} />
          <PasswordField name="newPassword" label="New password" readOnly={!isEditing} />
          <PasswordField name="confirmPassword" label="Confirm password" readOnly={!isEditing} />

          <FixedFormErrorMessage>{form.formState.errors.root?.authError.message}</FixedFormErrorMessage>
        </div>
      </form>
    </Form>
  );
};
