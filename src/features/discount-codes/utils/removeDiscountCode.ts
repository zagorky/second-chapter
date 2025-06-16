import type { Cart } from '@commercetools/platform-sdk';

import { apiInstance } from '~app/API/apiBuilder';

export const removeDiscountCode = async ({ cart, discountCodeId }: { cart: Cart; discountCodeId: string }) => {
  const response = await apiInstance.root
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        version: cart.version,
        actions: [{ action: 'removeDiscountCode', discountCode: { typeId: 'discount-code', id: discountCodeId } }],
      },
    })
    .execute();

  return response.body;
};
