import type { DiscountCode } from '@commercetools/platform-sdk';

import { getDiscountCodeById } from '~features/discount-codes/utils/getDiscountCodeById';
import { useState } from 'react';
import useSWR from 'swr';

export const useDiscountCodeById = (id: string | null) => {
  const [isLongLoading, setIsLongLoading] = useState(false);

  const {
    data,
    error,
    mutate: refresh,
    isLoading,
  } = useSWR<DiscountCode, Error>(id ? `discount-code-${id}` : null, id ? () => getDiscountCodeById(id) : null, {
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
    discountCode: data,
    error,
    refresh,
    isLongLoading,
    isLoading,
  };
};
