import type { LoginFormFieldValues } from '~features/sign-in/types/types';

import { apiInstance } from '~app/API/apiBuilder';
import { useAppStore } from '~stores/store';
import { useCallback, useState } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useAppStore((store) => store.isAuthenticated);
  const isClientVerified = useAppStore((store) => store.isClientVerified);

  const login = useCallback(async (credentials: LoginFormFieldValues) => {
    setIsLoading(true);

    try {
      return await apiInstance.login({
        username: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      return { success: false, error: error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    apiInstance.logout();
  }, []);

  return {
    login,
    logout,
    isLoading,
    isAuthenticated,
    isClientVerified,
  };
};
