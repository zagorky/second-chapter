import type { Cart } from '@commercetools/platform-sdk';

import { getIsGifted } from './getIsGifted';

export type ProductInCart = {
  isInCart: boolean;
  lineItemId?: string;
  quantity?: number;
};

export const getProductInCart = (cart: Cart | undefined, productId: string): ProductInCart => {
  if (!cart?.lineItems) {
    return { isInCart: false };
  }

  const lineItem = cart.lineItems.find((item) => item.productId === productId && !getIsGifted(item));

  if (lineItem) {
    return {
      isInCart: true,
      lineItemId: lineItem.id,
      quantity: lineItem.quantity,
    };
  }

  return { isInCart: false };
};
