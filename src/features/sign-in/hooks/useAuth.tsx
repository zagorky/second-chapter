import type { LoginFormFieldValues } from '~features/sign-in/types/types';

import { api } from '~app/API/apiBuilder';
import { useCallback, useState } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorAuth, setErrorAuth] = useState<unknown>(null);
  const [successAuth, setSuccessAuth] = useState(false);

  const login = useCallback(async (credentials: LoginFormFieldValues) => {
    setIsLoading(true);
    setErrorAuth(null);
    setSuccessAuth(false);

    try {
      const result = await api.login({
        username: credentials.email,
        password: credentials.password,
      });

      if (result.success) {
        setSuccessAuth(true);
        setErrorAuth(null);
      } else {
        setErrorAuth(result.error);
        setSuccessAuth(false);
      }

      return result;
    } catch (error) {
      setErrorAuth(error);
      setSuccessAuth(false);

      return { success: false, error: error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    api.logout();
    setSuccessAuth(false);
    setErrorAuth(null);
  }, []);

  return {
    login,
    logout,
    isLoading,
    errorAuth,
    successAuth,
  };
};
