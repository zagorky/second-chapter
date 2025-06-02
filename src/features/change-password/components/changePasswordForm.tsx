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
import { useForm } from 'react-hook-form';

export const ChangePasswordForm = () => {
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

  const handleSubmit: SubmitHandler<z.infer<typeof changePasswordSchema>> = async (data) => {
    await changePassword(data.currentPassword, data.newPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={(event) => void form.handleSubmit(handleSubmit)(event)} className="space-y-8">
        <div className="flex flex-col gap-6">
          <PasswordField name="currentPassword" label="Current password" />
          <PasswordField name="newPassword" label="New password" />
          <PasswordField name="confirmPassword" label="Confirm password" />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Spinner size="md" /> : 'Save'}
          </Button>
          <FixedFormErrorMessage>{form.formState.errors.root?.authError.message}</FixedFormErrorMessage>
        </div>
      </form>
    </Form>
  );
};
