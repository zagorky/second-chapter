import type { Cart } from '@commercetools/platform-sdk';

import { useAppStore } from '~stores/store';
import { useState } from 'react';
import useSWR from 'swr';

import { getCart } from '~/features/cart/utils/getCart';
import { getProductInCart, type ProductInCart } from '~/features/cart/utils/getProductInCart';

export const useCart = () => {
  const [isLongLoading, setIsLongLoading] = useState(false);
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  const {
    data: cart,
    error,
    mutate: refresh,
    isLoading,
  } = useSWR<Cart, Error>(`cart-${isAuthenticated ? 'authenticated' : 'unauthenticated'}`, getCart, {
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

  const checkProductInCart = (productId: string): ProductInCart => {
    return getProductInCart(cart, productId);
  };

  return {
    cart,
    error,
    refresh,
    isLongLoading,
    isLoading,
    getProductInCart: checkProductInCart,
  };
};
