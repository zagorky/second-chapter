import type { Customer } from '@commercetools/platform-sdk';
import type { LoginFormFieldValues } from '~features/sign-in/types/types';

import { api } from '~app/API/apiBuilder';
import { useCallback, useState } from 'react';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  type LoginResult = { success: true; payload: Customer } | { success: false; error: unknown };

  const login = useCallback(async (credentials: LoginFormFieldValues): Promise<LoginResult> => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await api.login({
        username: credentials.email,
        password: credentials.password,
      });

      if (!result.success) {
        setError(result.error);
      }

      return result;
    } catch (error_) {
      setError(error_);

      return { success: false, error: error_ };
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
    error,
  };
};
