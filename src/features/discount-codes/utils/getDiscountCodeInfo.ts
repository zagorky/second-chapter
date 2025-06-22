import type { DiscountCodeConfigType } from '~features/discount-codes/types/DiscountCodeConfigType';

import { DISCOUNT_CODE_CONFIG } from '~features/discount-codes/configs/discountCodeConfig';

export const getDiscountCodeInfo = (codeValue: string): DiscountCodeConfigType => {
  const code = DISCOUNT_CODE_CONFIG.find((code) => code.code === codeValue);

  return {
    code: code?.code ?? '',
    conditions: code?.conditions ?? 'No conditions available',
    image: {
      src: code?.image.src ?? '',
      width: code?.image.width ?? 0,
      height: code?.image.height ?? 0,
    },
    color: {
      background: code?.color.background ?? '--color-chart-1',
      foreground: code?.color.foreground ?? '--color-chart-2',
    },
    discount: code?.discount,
  };
};
