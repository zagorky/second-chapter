import { useCallback } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';

import { fetchProfileData } from '../utils/fetchProfileData';
import { updateProfile } from '../utils/updateProfileData';

type ProfileData = {
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
        toast.success('Profile updated successfully!');

        return true;
      } catch (error) {
        toast.error('Failed to update profile');
        throw error;
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
