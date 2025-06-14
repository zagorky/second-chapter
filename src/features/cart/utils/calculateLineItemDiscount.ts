import type { LineItem } from '@commercetools/platform-sdk';

export const calculateLineItemDiscount = (item: LineItem) => {
  const FULL_PERCENTAGE = 100;
  const fullPrice = item.price.value.centAmount;

  const discountedPrice = item.price.discounted?.value.centAmount ?? 0;

  const isDiscounted = discountedPrice > 0;

  if (!isDiscounted) {
    return { isDiscounted, fullPrice };
  }

  const discountAmount = fullPrice - discountedPrice;
  const discountPercentage = Math.max(Math.floor((discountAmount / fullPrice) * FULL_PERCENTAGE), 0);

  return { isDiscounted, fullPrice, discountAmount, discountPercentage, discountedPrice };
};
