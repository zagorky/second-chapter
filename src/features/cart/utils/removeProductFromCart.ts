import { apiInstance } from '~app/API/apiBuilder';

type RemoveProductFromCartOptions = {
  cartId: string;
  cartVersion: number;
  lineItemId: string;
  quantity?: number;
};

export const removeProductFromCart = async ({
  cartId,
  cartVersion,
  lineItemId,
  quantity = 1,
}: RemoveProductFromCartOptions) => {
  const result = await apiInstance.root
    .me()
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version: cartVersion,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
            quantity,
          },
        ],
      },
    })
    .execute();

  return result.body;
};
