import type { Cart } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { useCart } from '~features/cart/hooks/useCart';
import { postProductToCart } from '~features/cart/utils/postProductToCart';
import { removeProductFromCart } from '~features/cart/utils/removeProductFromCart';
import { normalizeError } from '~utils/normalizeError';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type QuantityControlsProps = {
  cart: Cart;
  productId: string;
  lineItemId: string;
  quantity: number;
};

const QUANTITY_TEXTS = {
  ERROR_ADD: 'Failed to increase quantity',
  ERROR_REMOVE: 'Failed to decrease quantity',
  SUCCESSFULLY_UPDATED: 'Cart updated successfully',
};

export const QuantityControls = ({ cart, productId, lineItemId, quantity }: QuantityControlsProps) => {
  const { refresh } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleIncreaseQuantity = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await postProductToCart({
        cartId: cart.id,
        cartVersion: cart.version,
        productId: productId,
        quantity: 1,
      });

      await refresh();
      toast.success(QUANTITY_TEXTS.SUCCESSFULLY_UPDATED);
    } catch (error: unknown) {
      toast.error(`${QUANTITY_TEXTS.ERROR_ADD}: ${normalizeError(error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecreaseQuantity = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await removeProductFromCart({
        cartId: cart.id,
        cartVersion: cart.version,
        lineItemId: lineItemId,
        quantity: 1,
      });

      await refresh();
      toast.success(QUANTITY_TEXTS.SUCCESSFULLY_UPDATED);
    } catch (error: unknown) {
      toast.error(`${QUANTITY_TEXTS.ERROR_REMOVE}: ${normalizeError(error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 select-none">
      <Button
        variant="ghost"
        onClick={() => void handleDecreaseQuantity()}
        disabled={isLoading}
        size="defaultNoPadding"
      >
        <span className="sr-only">Decrease quantity</span>
        <Minus />
      </Button>
      <span className="min-w-8 text-center">{quantity}</span>
      <Button
        variant="ghost"
        onClick={() => void handleIncreaseQuantity()}
        disabled={isLoading}
        size="defaultNoPadding"
      >
        <span className="sr-only">Increase quantity</span>
        <Plus />
      </Button>
    </div>
  );
};
