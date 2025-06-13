import type { Cart } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { useCart } from '~features/cart/hooks/useCart';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

import { normalizeError } from '~/utils/normalizeError';

import { clearCart } from '../utils/clearCart';
import { CartItem } from './CartItem';
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

  const handleClearCart = async () => {
    try {
      await clearCart(cart);
      await refresh();
      toast.success('Cart cleared successfully');
    } catch (error: unknown) {
      toast.error(normalizeError(error).message);
    }
  };

  return (
    <div data-testid="cart-items-list" className="flex flex-grow flex-col justify-between gap-8">
      <div className="grid gap-4">
        <div className="flex justify-end">
          <Button variant="default" size="default" onClick={() => void handleClearCart()}>
            <Trash />
            Clear cart
          </Button>
        </div>
        <ul className="grid gap-4">
          {cart.lineItems.map((item) => (
            <CartItem key={item.id} item={item} cart={cart} refresh={() => void refresh()} />
          ))}
        </ul>
      </div>

      <OrderSummary cart={cart} />
    </div>
  );
};
