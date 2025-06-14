import type { Cart } from '@commercetools/platform-sdk';

import { apiInstance } from '~app/API/apiBuilder';

export const getActiveCart = async (): Promise<Cart> => {
  const cart = await apiInstance.root.me().activeCart().get().execute();

  return cart.body;
};
