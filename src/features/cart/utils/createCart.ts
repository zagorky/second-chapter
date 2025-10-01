import type { Cart } from '@commercetools/platform-sdk';

import { apiInstance } from '~app/API/apiBuilder';
import { DEFAULT_CURRENCY, DEFAULT_COUNTRY } from '~config/constants';

export const createCart = async (): Promise<Cart> => {
  const cart = await apiInstance.root
    .me()
    .carts()
    .post({
      body: {
        currency: DEFAULT_CURRENCY,
        country: DEFAULT_COUNTRY,
      },
    })
    .execute();

  return cart.body;
};
