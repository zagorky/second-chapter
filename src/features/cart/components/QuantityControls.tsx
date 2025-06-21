import type { Cart, LineItem } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { useCart } from '~features/cart/hooks/useCart';
import { getIsGifted } from '~features/cart/utils/getIsGifted';
import { postProductToCart } from '~features/cart/utils/postProductToCart';
import { removeProductFromCart } from '~features/cart/utils/removeProductFromCart';
import { normalizeError } from '~utils/normalizeError';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type QuantityControlsProps = {
  cart: Cart;
  lineItem: LineItem;
};

const QUANTITY_TEXTS = {
  ERROR_ADD: 'Failed to increase quantity',
  ERROR_REMOVE: 'Failed to decrease quantity',
  SUCCESSFULLY_UPDATED: 'Cart updated successfully',
  SR_DECREASE_QUANTITY: 'Decrease quantity',
  SR_INCREASE_QUANTITY: 'Increase quantity',
};

export const QuantityControls = ({ cart, lineItem }: QuantityControlsProps) => {
  const { quantity, id: lineItemId, productId } = lineItem;
  const { refresh } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const isGifted = getIsGifted(lineItem);

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
        variant="default"
        onClick={() => void handleDecreaseQuantity()}
        disabled={isLoading || isGifted}
        size="smPadding"
      >
        <span className="sr-only">{QUANTITY_TEXTS.SR_DECREASE_QUANTITY}</span>
        <Minus />
      </Button>
      <span className="min-w-8 text-center">{quantity}</span>
      <Button variant="default" onClick={() => void handleIncreaseQuantity()} disabled={isLoading} size="smPadding">
        <span className="sr-only">{QUANTITY_TEXTS.SR_INCREASE_QUANTITY}</span>
        <Plus />
      </Button>
    </div>
  );
};
