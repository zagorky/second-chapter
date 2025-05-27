import type { ProductProjection } from '@commercetools/platform-sdk';

export const getPriceFilterData = (products: ProductProjection[]) => {
  const discountProductsNumber = countDiscountProducts(products);
  const { min, max } = getPriceRange(products);

  return {
    discountProductsNumber,

    min,
    max,
  };
};

const getPriceRange = (products: ProductProjection[]) => {
  let min = Infinity;
  let max = -Infinity;

  products.forEach((product) => {
    const price = product.masterVariant.prices?.[0];

    if (price) {
      const amount = price.value.centAmount;

      if (amount > 0) {
        min = Math.min(min, amount);
        max = Math.max(max, amount);
      }
    }
  });

  if (!Number.isFinite(min)) min = 0;
  if (!Number.isFinite(max)) max = 0;

  return { min, max };
};

const countDiscountProducts = (products: ProductProjection[]) => {
  return products.filter((product) => product.masterVariant.prices?.[0]?.discounted !== undefined).length;
};
