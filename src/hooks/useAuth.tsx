import type { Customer } from '@commercetools/platform-sdk';
import type { LoginFormFieldValues } from '~features/sign-in/types/types';

import { ApiBuilder } from '~app/API/apiBuilder';
import { useCallback, useMemo, useState } from 'react';

export const useAuth = () => {
  const api = useMemo(() => new ApiBuilder(), []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  type LoginResult = { success: true; payload: Customer } | { success: false; error: unknown };

  const login = useCallback(
    async (credentials: LoginFormFieldValues): Promise<LoginResult> => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await api.login({
          username: credentials.email,
          password: credentials.password,
        });

        console.log('result from hook', result);

        if (result.success && result.payload.email === credentials.email) {
          return result;
        } else {
          const error = new Error('Invalid email or password');

          setError(error);

          return { success: false, error };
        }
      } catch (error) {
        setError(error);

        return { success: false, error: error };
      } finally {
        setIsLoading(false);
      }
    },
    [api]
  );

  const logout = useCallback(() => {
    api.logout();
  }, [api]);

  return {
    login,
    logout,
    isLoading,
    error,
  };
};
