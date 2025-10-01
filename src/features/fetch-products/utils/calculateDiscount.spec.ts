import type { ProductProjection } from '@commercetools/platform-sdk';

import { calculateDiscount } from '~features/fetch-products/utils/calculateDiscount';
import { describe, it, expect } from 'vitest';

const createMockProduct = (originalPrice: number, discountedPrice?: number): ProductProjection => ({
  id: 'id',
  version: 0,
  createdAt: '',
  lastModifiedAt: '',
  productType: {
    typeId: 'product-type',
    id: 'id',
  },
  name: {},
  slug: {},
  categories: [],
  masterVariant: {
    id: 1,
    prices: [
      {
        id: 'id',
        value: {
          type: 'centPrecision',
          currencyCode: 'GBP',
          centAmount: originalPrice,
          fractionDigits: 2,
        },
        country: 'GBP',
        ...(discountedPrice && {
          discounted: {
            value: {
              type: 'centPrecision',
              currencyCode: 'GBP',
              centAmount: discountedPrice,
              fractionDigits: 2,
            },
            discount: {
              typeId: 'product-discount',
              id: 'id',
            },
          },
        }),
      },
    ],
  },
  variants: [],
  hasStagedChanges: false,
});

describe('calculateDiscount', () => {
  it('should calculate correct discount percentage', () => {
    const originalPrice = 1000;
    const discountedPrice = 800;
    const expectedDiscount = 20;

    const product = createMockProduct(originalPrice, discountedPrice);

    const result = calculateDiscount(product);

    expect(result).toBe(expectedDiscount);
  });
});
