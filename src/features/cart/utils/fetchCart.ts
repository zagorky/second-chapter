import type { Cart, CartUpdateAction, MyCartUpdateAction } from '@commercetools/platform-sdk';

import { apiInstance } from '~app/API/apiBuilder';
import { CURRENCY } from '~features/cart/config/constants';

const createActiveUserCart = async () => {
  return await apiInstance.root
    .me()
    .carts()
    .post({
      body: {
        currency: CURRENCY,
      },
    })
    .execute();
};

const createAnonymousCart = async () => {
  return await apiInstance.root
    .carts()
    .post({
      body: {
        anonymousId: generateAnonymousId(),
        currency: CURRENCY,
      },
    })
    .execute();
};

const getAnonymousCart = async (cartId: string) => {
  return await apiInstance.root.carts().withId({ ID: cartId }).get().execute();
};

const getActiveUserCart = async () => {
  return await apiInstance.root.me().activeCart().get().execute();
};

const updateAnonymousCart = async (cart: Cart, actions: CartUpdateAction[]) => {
  return await apiInstance.root
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        actions,
        version: cart.version,
      },
    })
    .execute();
};

const updateActiveUserCart = async (cart: Cart, actions: MyCartUpdateAction[]) => {
  return await apiInstance.root
    .me()
    .carts()
    .withId({ ID: cart.id })
    .post({
      body: {
        actions,
        version: cart.version,
      },
    })
    .execute();
};

function isAnonymousCart(cart: Cart): boolean {
  return !cart.customerId && !!cart.anonymousId;
}

function isActiveUserCart(cart: Cart): boolean {
  return !!cart.customerId && !cart.anonymousId;
}

function generateAnonymousId(): string {
  return 'anon-' + crypto.randomUUID();
}

console.error(
  createActiveUserCart,
  createAnonymousCart,
  getActiveUserCart,
  getAnonymousCart,
  updateActiveUserCart,
  updateAnonymousCart,
  isActiveUserCart,
  isAnonymousCart
);
