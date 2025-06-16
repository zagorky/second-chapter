import type { Cart } from '@commercetools/platform-sdk';

import { apiInstance } from '~/app/API/apiBuilder';

export const applyDiscountCode = async ({ cart, discountCode }: { cart: Cart; discountCode: string }) => {
  const response = await apiInstance.root
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [{ action: 'addDiscountCode', code: discountCode }],
      },
    })
    .execute();

  return response.body;
};
