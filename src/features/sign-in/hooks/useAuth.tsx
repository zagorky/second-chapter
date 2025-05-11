import type { LoginFormFieldValues } from '~features/sign-in/types/types';

import { api } from '~app/API/apiBuilder';
import { useCallback, useState } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorAuth, setErrorAuth] = useState<unknown>(null);

  const login = useCallback(async (credentials: LoginFormFieldValues) => {
    setIsLoading(true);
    setErrorAuth(null);

    try {
      const result = await api.login({
        username: credentials.email,
        password: credentials.password,
      });

      if (result.success) {
        setErrorAuth(null);
      } else {
        setErrorAuth(result.error);
      }

      return result;
    } catch (error) {
      setErrorAuth(error);

      return { success: false, error: error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    api.logout();
    setErrorAuth(null);
  }, []);

  return {
    login,
    logout,
    isLoading,
    errorAuth,
    setErrorAuth,
  };
};
