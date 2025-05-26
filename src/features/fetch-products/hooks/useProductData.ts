import type { ProductProjection } from '@commercetools/platform-sdk';
import type { FetchProductsParameters } from '~features/fetch-products/utils/fetchProducts';

import { fetchProducts } from '~features/fetch-products/utils/fetchProducts';
import { useState } from 'react';
import useSWR from 'swr';

export const useProductData = (parameters?: FetchProductsParameters) => {
  const [isLongLoading, setIsLongLoading] = useState(false);
  const actualParameters = { expand: ['categories[*]'], limit: 100, ...parameters };

  const {
    data: products,
    error,
    mutate: refresh,
    isLoading,
  } = useSWR<ProductProjection[], Error>(actualParameters, fetchProducts, {
    onLoadingSlow: () => {
      setIsLongLoading(true);
    },
    onSuccess: () => {
      setIsLongLoading(false);
    },
    onError: () => {
      setIsLongLoading(false);
    },
    loadingTimeout: 200,
  });

  return {
    products,
    error,
    refresh,
    isLongLoading,
    isLoading,
  };
};
