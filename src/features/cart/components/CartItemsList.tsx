import type { Cart } from '@commercetools/platform-sdk';

import { DEFAULT_STORE_LANGUAGE } from '~config/constants';

import { EmptyCartContent } from './EmptyCartContent';

type CartItemsListProps = {
  cart: Cart;
};

export const CartItemsList = ({ cart }: CartItemsListProps) => {
  if (cart.lineItems.length === 0) {
    return <EmptyCartContent />;
  }

  return (
    <div>
      <ul>
        {cart.lineItems.map((item) => (
          <li key={item.id}>{item.name[DEFAULT_STORE_LANGUAGE]}</li>
        ))}
      </ul>
    </div>
  );
};
