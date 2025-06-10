import type { Cart } from '@commercetools/platform-sdk';

import { useState } from 'react';
import useSWR from 'swr';

import { getCart } from '~/features/cart/utils/getCart';

export const useCart = () => {
  const [isLongLoading, setIsLongLoading] = useState(false);

  const {
    data: cart,
    error,
    mutate: refresh,
    isLoading,
  } = useSWR<Cart, Error>('cart', getCart, {
    onLoadingSlow: () => {
      setIsLongLoading(true);
    },
    onSuccess: () => {
      setIsLongLoading(false);
    },
    onError: () => {
      setIsLongLoading(false);
    },
    loadingTimeout: 500,
  });

  return {
    cart,
    error,
    refresh,
    isLongLoading,
    isLoading,
  };
};
