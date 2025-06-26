import type { ProductProjection } from '@commercetools/platform-sdk';

import { useState } from 'react';
import useSWR from 'swr';

import { fetchProductByKey } from '~/features/fetch-products/utils/fetchProductByKey';

export const useProductByKey = (key: string) => {
  const [isLongLoading, setIsLongLoading] = useState(false);
  const {
    data: product,
    error,
    mutate: refresh,
    isLoading,
  } = useSWR<ProductProjection, Error>(key, fetchProductByKey, {
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
    product,
    error,
    refresh,
    isLongLoading,
    isLoading,
  };
};
