import type { CustomCustomerDraft } from '~app/API/types/customCustomerDraft';

import { apiInstance } from '~app/API/apiBuilder';
import { createCustomer } from '~app/API/utils/createCustomer';
import { parseErrorMessage } from '~app/API/utils/parseApiErrorMessage';
import { toast } from 'sonner';

export const signupCustomer = async (customerDraft: CustomCustomerDraft) => {
  const response = await createCustomer(customerDraft);

  if (response.success) {
    const customer = response.payload.body?.customer;

    await apiInstance.login({ username: customerDraft.email, password: customerDraft.password });
    toast.success(`All set, ${customer?.firstName ?? 'friend'}! The shelves are now yours to explore.`);
  } else {
    const parsedMessage = parseErrorMessage(response.error);

    toast.error(parsedMessage);
  }
};
