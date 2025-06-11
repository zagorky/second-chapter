import type { ProductProjection } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { Spinner } from '~components/ui/spinner/spinner';
import { DEFAULT_STORE_LANGUAGE } from '~config/constants';
import { navigationRoutes } from '~config/navigation';
import { useCart } from '~features/cart/hooks/useCart';
import { postProductToCart } from '~features/cart/utils/postProductToCart';
import { removeProductFromCart } from '~features/cart/utils/removeProductFromCart';
import { withDataTestId } from '~utils/helpers';
import { normalizeError } from '~utils/normalizeError';
import { X, Plus, ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

type ProductCartButtonsProps = {
  product: ProductProjection;
  identifier: string;
};

const CART_BUTTON_TEXTS = {
  ADD_TO_CART: 'Add to cart',
  ERROR_ADD: 'Failed to add product to cart',
  ERROR_REMOVE: 'Failed to remove product from cart',
  TO_CART: 'View cart',
  ALREADY_IN_CART: 'Gotcha!',
  SUCCESSFULLY_ADDED: (productName: string) => `Hurray! You've successfully added "${productName}" to cart`,
  SUCCESSFULLY_REMOVED: (productName: string) => `"${productName}" removed from cart`,
};

export const ProductCartButtons = ({ product, identifier }: ProductCartButtonsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const { cart, refresh, getProductInCart } = useCart();
  const { isInCart, lineItemId } = getProductInCart(product.id);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!cart || isAdding) return;

    try {
      setIsAdding(true);
      await postProductToCart({
        cartId: cart.id,
        cartVersion: cart.version,
        productId: product.id,
        quantity: 1,
      });

      await refresh();
      toast.success(CART_BUTTON_TEXTS.SUCCESSFULLY_ADDED(product.name[DEFAULT_STORE_LANGUAGE]), {
        action: {
          label: CART_BUTTON_TEXTS.TO_CART,
          onClick: () => void navigate(navigationRoutes.cart.path),
        },
        actionButtonStyle: {
          cursor: 'pointer',
        },
        duration: 4000,
      });
    } catch (error: unknown) {
      toast.error(`${CART_BUTTON_TEXTS.ERROR_ADD}: ${normalizeError(error).message}`);
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveFromCart = async () => {
    if (!cart || isRemoving || !lineItemId) return;

    const { quantity } = getProductInCart(product.id);

    if (!quantity) return;

    try {
      setIsRemoving(true);
      await removeProductFromCart({
        cartId: cart.id,
        cartVersion: cart.version,
        lineItemId: lineItemId,
        quantity: quantity,
      });

      await refresh();
      toast.success(CART_BUTTON_TEXTS.SUCCESSFULLY_REMOVED(product.name[DEFAULT_STORE_LANGUAGE]));
    } catch (error: unknown) {
      toast.error(`${CART_BUTTON_TEXTS.ERROR_REMOVE}: ${normalizeError(error).message}`);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleCartAction = () => {
    if (isInCart) {
      void navigate(navigationRoutes.cart.path);
    } else {
      void handleAddToCart();
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleCartAction}
        disabled={isAdding || !cart}
        {...withDataTestId(`${identifier}-add-to-cart`)}
        className="flex min-w-[60px] flex-grow"
      >
        {isAdding ? (
          <Spinner />
        ) : isInCart ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm leading-tight">
              <Check />
              {CART_BUTTON_TEXTS.ALREADY_IN_CART} {CART_BUTTON_TEXTS.TO_CART}
              <ArrowRight />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Plus /> {CART_BUTTON_TEXTS.ADD_TO_CART}
          </div>
        )}
      </Button>
      {isInCart && (
        <Button
          onClick={() => void handleRemoveFromCart()}
          disabled={isRemoving || !cart}
          {...withDataTestId(`${identifier}-remove-from-cart`)}
          className="min-w-[60px]"
          variant="neutral"
        >
          {isRemoving ? <Spinner /> : <X />}
        </Button>
      )}
    </div>
  );
};
