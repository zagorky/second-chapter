import type { CustomCustomerDraft } from '~app/API/types/customCustomerDraft';

import { apiInstance } from '~app/API/apiBuilder';
import { createCustomer } from '~app/API/utils/createCustomer';
import { useState, useCallback } from 'react';

export const useSignupCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signupCustomer = useCallback(async (customerDraft: CustomCustomerDraft) => {
    setIsLoading(true);
    try {
      const response = await createCustomer(customerDraft);

      if (!response.success) {
        return { success: false, error: response.error };
      }

      const customer = response.payload.body?.customer;

      const loginResponse = await apiInstance.login({
        username: customerDraft.email,
        password: customerDraft.password,
      });

      if (!loginResponse.success) {
        return { success: false, error: loginResponse.error };
      }

      return { success: true, customer };
    } catch (error) {
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { signupCustomer, isLoading };
};
