import type { DiscountCode } from '@commercetools/platform-sdk';

export const filterActiveDiscounts = (codes: DiscountCode[]) => {
  return codes.filter((code) => code.validFrom && code.validUntil);
};
