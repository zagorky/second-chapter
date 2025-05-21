import type { ProductProjection } from '@commercetools/platform-sdk';

import { CACHE_KEY } from '~features/fetch-products/config/constants';
import { fetchProducts } from '~features/fetch-products/utils/fetchProducts';
import { toast } from 'sonner';
import useSWR from 'swr';

export const useProductData = () => {
  const {
    data: products,
    error,
    isLoading,
    mutate,
  } = useSWR<ProductProjection[], Error>(CACHE_KEY, fetchProducts, {
    onLoadingSlow: () => {
      toast.info(`We've been looking for books for too long... Please, wait a sec`);
    },
    loadingTimeout: 2000,
  });

  return {
    products,
    error,
    isLoading,
    mutate,
  };
};
