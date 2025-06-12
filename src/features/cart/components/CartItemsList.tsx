import type { Cart } from '@commercetools/platform-sdk';

import { DEFAULT_STORE_LANGUAGE } from '~config/constants';

import { formatPrice } from '~/features/fetch-products/utils/formatPrice';

import { EmptyCartContent } from './EmptyCartContent';
import { QuantityControls } from './QuantityControls';

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
            <div>
              {item.name[DEFAULT_STORE_LANGUAGE]} - {formatPrice(item.price.value.centAmount)} -{' '}
              {formatPrice(item.totalPrice.centAmount)}
            </div>
            <QuantityControls cart={cart} productId={item.productId} lineItemId={item.id} quantity={item.quantity} />
          </li>
        ))}
      </ul>
      <div>Total: {formatPrice(cart.totalPrice.centAmount)}</div>
    </div>
  );
};
