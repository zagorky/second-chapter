import type { Cart } from '@commercetools/platform-sdk';

import { apiInstance } from '~app/API/apiBuilder';

export const clearCart = async (cart: Cart) => {
  const response = await apiInstance.root
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: cart.lineItems
          .filter((item) => item.lineItemMode !== 'GiftLineItem')
          .map((item) => ({
            action: 'removeLineItem',
            lineItemId: item.id,
          })),
      },
    })
    .execute();

  return response.body;
};
