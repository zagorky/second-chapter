import type { DiscountCodeConfig } from '~features/discount-codes/types/DiscountCodeConfig';

import { DISCOUNT_CODES } from '~features/discount-codes/configs/discountCodesConfig';

export const getDiscountCodeInfo = (id: string): DiscountCodeConfig => {
  const code = DISCOUNT_CODES.find((code) => code.id === id);

  return {
    title: code?.title ?? 'Unknown code',
    description: code?.description ?? 'No description available',
    conditions: code?.conditions ?? 'No conditions available',
    id: code?.id ?? '',
    code: code?.code ?? '',
  };
};
