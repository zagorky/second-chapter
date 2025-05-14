import type { CustomCustomerDraft } from '~app/API/types/customCustomerDraft';

import { apiInstance } from '~app/API/apiBuilder';
import { createCustomer } from '~app/API/utils/createCustomer';
import { parseApiErrorMessage } from '~app/API/utils/parseApiErrorMessage';
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

import { API_ERRORS } from '~/app/API/config/apiErrors';

export const useSignupCustomer = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signupCustomer = useCallback(async (customerDraft: CustomCustomerDraft) => {
    setIsLoading(true);
    try {
      const response = await createCustomer(customerDraft);

      if (response.success) {
        const customer = response.payload.body?.customer;

        await apiInstance.login({ username: customerDraft.email, password: customerDraft.password });
        toast.success(`All set, ${customer?.firstName ?? 'friend'}! The shelves are now yours to explore.`);
      } else {
        const parsedMessage = parseApiErrorMessage(response.error);

        toast.error(parsedMessage);
      }
    } catch {
      toast.error(API_ERRORS.SIGNUP_UNKNOWN);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { signupCustomer, isLoading };
};
