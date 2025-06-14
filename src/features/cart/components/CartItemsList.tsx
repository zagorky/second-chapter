import type { Cart } from '@commercetools/platform-sdk';

import { useCart } from '~features/cart/hooks/useCart';

import { CartItem } from './CartItem';
import { ClearCartDialog } from './ClearCartDialog';
import { EmptyCartContent } from './EmptyCartContent';
import { OrderSummary } from './OrderSummary';

type CartItemsListProps = {
  cart: Cart;
};

export const CartItemsList = ({ cart }: CartItemsListProps) => {
  const { refresh } = useCart();

  if (cart.lineItems.length === 0) {
    return <EmptyCartContent />;
  }

  return (
    <div data-testid="cart-items-list" className="flex flex-grow flex-col justify-between gap-8">
      <div className="grid gap-4">
        <div className="flex justify-end">
          <ClearCartDialog
            cart={cart}
            onCartCleared={() => {
              void refresh();
            }}
          />
        </div>
        <ul className="grid gap-4">
          {cart.lineItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              cart={cart}
              refresh={() => {
                void refresh();
              }}
            />
          ))}
        </ul>
      </div>

      <OrderSummary cart={cart} />
    </div>
  );
};
