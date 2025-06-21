import { apiInstance } from '~app/API/apiBuilder';

type PostProductToCartOptions = {
  cartId: string;
  cartVersion: number;
  productId: string;
  quantity?: number;
};

export const postProductToCart = async ({ cartId, cartVersion, productId, quantity = 1 }: PostProductToCartOptions) => {
  const result = await apiInstance.root
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'addLineItem',
            productId,
            variantId: 1,
            quantity,
          },
        ],
      },
    })
    .execute();

  return result.body;
};
