import { useCallback } from 'react';
import { toast } from 'sonner';
import useSWR, { mutate as globalMutate } from 'swr';

import { fetchProfileData } from '../utils/fetchProfileData';
import { updateProfile } from '../utils/updateProfileData';

type ProfileData = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  dateOfBirth?: string;
};

export const useUpdateProfileData = () => {
  const { data: profileData, mutate } = useSWR<ProfileData | undefined, Error>('profileData', fetchProfileData);

  const updateProfileDataHandler = useCallback(
    async (updateProfileData: { firstName?: string; lastName?: string; email?: string; dataOfBirth?: string }) => {
      try {
        await updateProfile(updateProfileData);
        await mutate();

        if (updateProfileData.email) {
          await globalMutate('changePassword');
        }

        toast.success('Profile updated successfully!');

        return true;
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === 'EMAIL_ALREADY_EXISTS') {
            toast.error('Oops! That email is already registered. Please use a different email address.');
          } else {
            toast.error('Failed to update address.');
          }
          throw error;
        }
      }
    },
    [mutate]
  );

  return {
    profileData,
    updateProfileData: updateProfileDataHandler,
    refresh: mutate,
  };
};
