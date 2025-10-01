import type { ProductProjection } from '@commercetools/platform-sdk';

export const calculateDiscount = (product: ProductProjection) => {
  const FULL_PERCENTAGE = 100;
  const originalPrice = product.masterVariant.prices?.[0]?.value.centAmount ?? 0;
  const discountedPrice = product.masterVariant.prices?.[0]?.discounted?.value.centAmount;
  const isDiscounted = discountedPrice && discountedPrice < originalPrice;

  return isDiscounted ? Math.round(((originalPrice - discountedPrice) / originalPrice) * FULL_PERCENTAGE) : 0;
};
