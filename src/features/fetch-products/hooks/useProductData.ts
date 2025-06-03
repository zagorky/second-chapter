import type { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk';
import type { FetchProductsParameters } from '~features/fetch-products/utils/fetchProducts';

import { fetchProducts } from '~features/fetch-products/utils/fetchProducts';
import { useState } from 'react';
import useSWR from 'swr';

export const useProductData = (parameters?: FetchProductsParameters) => {
  const [isLongLoading, setIsLongLoading] = useState(false);
  const limit = 6;

  const actualParameters = {
    expand: ['categories[*]'],
    withTotal: true,
    ...parameters,
    limit,
  };

  const {
    data,
    error,
    mutate: refresh,
    isLoading,
  } = useSWR<ProductProjectionPagedSearchResponse, Error>(actualParameters, fetchProducts, {
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
    products: data?.results,
    error,
    refresh,
    isLongLoading,
    isLoading,
    total: data?.total ?? 0,
    limit,
  };
};
