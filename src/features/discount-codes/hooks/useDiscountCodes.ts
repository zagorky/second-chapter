import type { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';

import { filterActiveDiscounts } from '~features/discount-codes/utils/filterActiveDiscounts';
import { getDiscountCodes } from '~features/discount-codes/utils/getDiscountCodes';
import { useState } from 'react';
import useSWR from 'swr';

export const useDiscountCodes = () => {
  const [isLongLoading, setIsLongLoading] = useState(false);

  const {
    data,
    error,
    mutate: refresh,
    isLoading,
  } = useSWR<DiscountCodePagedQueryResponse, Error>('discount-codes', getDiscountCodes, {
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

  const activeDiscountCodes = filterActiveDiscounts(data?.results ?? []);

  return {
    discountCodes: data?.results,
    activeDiscountCodes,
    error,
    refresh,
    isLongLoading,
    isLoading,
  };
};
