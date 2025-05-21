import type { ProductProjection } from '@commercetools/platform-sdk';

import { CACHE_KEY } from '~features/fetch-products/config/constants';
import { fetchProducts } from '~features/fetch-products/utils/fetchProducts';
import { useState } from 'react';
import useSWR from 'swr';

export const useProductData = () => {
  const [isLongLoading, setIsLongLoading] = useState(false);
  const {
    data: products,
    error,
    mutate: refresh,
  } = useSWR<ProductProjection[], Error>(CACHE_KEY, fetchProducts, {
    onLoadingSlow: () => {
      setIsLongLoading(true);
    },
    onSuccess: () => {
      setIsLongLoading(false);
    },
    onError: () => {
      setIsLongLoading(false);
    },
    loadingTimeout: 2000,
  });

  return {
    products,
    error,
    refresh,
    isLongLoading,
  };
};
