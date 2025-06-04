import type { Customer } from '@commercetools/platform-sdk';

import { apiInstance } from '~/app/API/apiBuilder';

export const fetchCustomer = async (): Promise<Customer> => {
  const response = await apiInstance.root.me().get().execute();

  return response.body;
};
