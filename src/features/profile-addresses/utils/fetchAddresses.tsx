import type { BaseAddress } from '@commercetools/platform-sdk';

import { apiInstance } from '~/app/API/apiBuilder';

export const fetchAddresses = async (): Promise<BaseAddress[]> => {
  const response = await apiInstance.root.me().get().execute();

  return response.body.addresses;
};
