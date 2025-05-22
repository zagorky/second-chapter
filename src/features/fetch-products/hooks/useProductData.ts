import type { ProductProjection } from '@commercetools/platform-sdk';
import type { FetchProductsParameters } from '~features/fetch-products/utils/fetchProducts';

import { fetchProducts } from '~features/fetch-products/utils/fetchProducts';
import { useState } from 'react';
import useSWR from 'swr';

export const useProductData = (parameters?: FetchProductsParameters) => {
  const [isLongLoading, setIsLongLoading] = useState(false);
  const actualParameters = { limit: 100, sort: 'name.en asc', ...parameters };

  const {
    data: products,
    error,
    mutate: refresh,
  } = useSWR<ProductProjection[], Error>(actualParameters, () => fetchProducts(actualParameters), {
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
