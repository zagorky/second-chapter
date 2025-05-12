import type { LoginFormFieldValues } from '~features/sign-in/types/types';

import { api } from '~app/API/apiBuilder';
import { useAppStore } from '~stores/store';
import { useCallback, useState } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isAuthenticated = useAppStore((store) => store.isAuthenticated);

  const login = useCallback(async (credentials: LoginFormFieldValues) => {
    setIsLoading(true);

    try {
      return await api.login({
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
    api.logout();
  }, []);

  return {
    login,
    logout,
    isLoading,
    isAuthenticated,
  };
};
