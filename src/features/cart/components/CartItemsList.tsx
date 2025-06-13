import type { Cart } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { DEFAULT_STORE_LANGUAGE } from '~config/constants';
import { useCart } from '~features/cart/hooks/useCart';
import { Trash } from 'lucide-react';

import { removeProductFromCart } from '~/features/cart/utils/removeProductFromCart';
import { formatPrice } from '~/features/fetch-products/utils/formatPrice';

import { clearCart } from '../utils/clearCart';
import { EmptyCartContent } from './EmptyCartContent';
import { QuantityControls } from './QuantityControls';

type CartItemsListProps = {
  cart: Cart;
};

const formatPriceWithCurrency = (price: number) => `£${formatPrice(price)}`;

export const CartItemsList = ({ cart }: CartItemsListProps) => {
  const { refresh } = useCart();

  if (cart.lineItems.length === 0) {
    return <EmptyCartContent />;
  }

  const handleClearCart = async () => {
    await clearCart(cart);
    await refresh();
  };

  return (
    <div data-testid="cart-items-list">
      <div>
        <Button variant="ghost" size="icon" onClick={() => void handleClearCart()}>
          <Trash />
        </Button>
      </div>
      <ul>
        {cart.lineItems.map((item) => (
          <li key={item.id} className="flex justify-between gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                void removeProductFromCart({
                  cartId: cart.id,
                  lineItemId: item.id,
                  cartVersion: cart.version,
                  quantity: item.quantity,
                }).then(refresh)
              }
            >
              <Trash />
            </Button>

            <div>
              {item.name[DEFAULT_STORE_LANGUAGE]} - {formatPriceWithCurrency(item.price.value.centAmount)} -{' '}
              {formatPriceWithCurrency(item.totalPrice.centAmount)}
            </div>
            <QuantityControls cart={cart} productId={item.productId} lineItemId={item.id} quantity={item.quantity} />
          </li>
        ))}
      </ul>
      <div className="text-lg">Total: {formatPriceWithCurrency(cart.totalPrice.centAmount)}</div>
    </div>
  );
};
