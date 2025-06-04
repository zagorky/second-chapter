import type { Customer } from '@commercetools/platform-sdk';

import { fetchPassword, updatePassword } from '~features/change-password/utils/fetchPassword';
import { useAuth } from '~features/sign-in/hooks/useAuth';
import { useCallback } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';

export const useChangePassword = () => {
  const { logout, login, isLoading } = useAuth();

  const { data: customerData } = useSWR<Customer, Error>('changePassword', fetchPassword);
  const email = customerData?.email;

  const changePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      if (!email) {
        throw new Error('User email not found');
      }
      try {
        await updatePassword(currentPassword, newPassword);
        logout();
        const result = await login({ email, password: newPassword });

        if (!result.success) {
          throw new Error('Error occurred during login with new password');
        }
        toast.success('Your password has been changed successfully!');

        return true;
      } catch (error) {
        toast.error('Failed to change password');
        throw error;
      }
    },
    [email, logout, login]
  );

  return {
    changePassword,
    isLoading,
  };
};
