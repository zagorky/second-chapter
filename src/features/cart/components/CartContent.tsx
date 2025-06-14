import { normalizeError } from '~utils/normalizeError';

import { DataErrorElement } from '~/components/ui/data-error-element/dataErrorElement';
import { Spinner } from '~/components/ui/spinner/spinner';
import { useCart } from '~/features/cart/hooks/useCart';

import { CartItemsList } from './CartItemsList';

export const CartContent = () => {
  const ERROR_TEXT = 'Error loading cart';
  const { cart, error, isLongLoading, refresh } = useCart();

  if (isLongLoading || !cart) {
    return <Spinner className="m-auto" size="xl" />;
  }

  if (error) {
    return <DataErrorElement errorText={`${ERROR_TEXT}: ${normalizeError(error).message}`} retryAction={refresh} />;
  }

  return <CartItemsList cart={cart} />;
};
