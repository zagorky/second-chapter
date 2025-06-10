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
    <div data-testid="cart-items-list">
      <ul>
        {cart.lineItems.map((item) => (
          <li key={item.id}>
            {item.name[DEFAULT_STORE_LANGUAGE]} - {item.quantity} - {item.price.value.centAmount} -
            {item.totalPrice.centAmount}
          </li>
        ))}
      </ul>
    </div>
  );
};
