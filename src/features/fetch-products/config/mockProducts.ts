import type { ProductProjection } from '@commercetools/platform-sdk';

export const mockProduct1: ProductProjection = {
  id: 'test-id-1',
  version: 1,
  createdAt: '2023-01-01T00:00:00.000Z',
  lastModifiedAt: '2023-01-01T00:00:00.000Z',
  productType: {
    typeId: 'product-type',
    id: 'product-type-id',
  },
  categories: [
    {
      typeId: 'category',
      id: 'category-id-1',
    },
  ],
  name: {
    'en-GB': 'Test Product Name',
  },
  slug: {
    'en-GB': 'test-product-slug',
  },
  description: {
    'en-GB': 'Test product description',
  },
  masterVariant: {
    id: 1,
    sku: 'test-sku',
    images: [
      {
        url: 'https://example.com/product-image.jpg',
        label: 'Main product image',
        dimensions: {
          w: 100,
          h: 100,
        },
      },
    ],
    prices: [
      {
        id: 'price-id',
        value: {
          type: 'centPrecision',
          currencyCode: 'GBP',
          centAmount: 1000,
          fractionDigits: 2,
        },
        discounted: {
          value: {
            type: 'centPrecision',
            currencyCode: 'GBP',
            centAmount: 800,
            fractionDigits: 2,
          },
          discount: {
            typeId: 'product-discount',
            id: 'discount-id-1',
          },
        },
      },
    ],
    attributes: [
      {
        name: 'author',
        value: 'Test Author',
      },
      {
        name: 'condition',
        value: {
          label: 'Like New',
          key: '0',
        },
      },
    ],
  },
  variants: [],
  published: true,
  hasStagedChanges: false,
  taxCategory: {
    typeId: 'tax-category',
    id: 'tax-category-id',
  },
};

const mockProduct2: ProductProjection = {
  id: 'test-id-2',
  version: 2,
  createdAt: '2023-01-01T00:00:00.000Z',
  lastModifiedAt: '2023-01-01T00:00:00.000Z',
  productType: {
    typeId: 'product-type',
    id: 'product-type-id',
  },
  categories: [
    {
      typeId: 'category',
      id: 'category-id-2',
    },
  ],
  name: {
    'en-GB': 'Test Product Name-2',
  },
  slug: {
    'en-GB': 'test-product-slug-2',
  },
  description: {
    'en-GB': 'Test product description-2',
  },
  masterVariant: {
    id: 1,
    sku: 'test-sku-2',
    images: [
      {
        url: 'https://example.com/product-image.jpg',
        label: 'Main product image-2',
        dimensions: {
          w: 100,
          h: 100,
        },
      },
    ],
    prices: [
      {
        id: 'price-id-2',
        value: {
          type: 'centPrecision',
          currencyCode: 'GBP',
          centAmount: 2000,
          fractionDigits: 2,
        },
        discounted: {
          value: {
            type: 'centPrecision',
            currencyCode: 'GBP',
            centAmount: 800,
            fractionDigits: 2,
          },
          discount: {
            typeId: 'product-discount',
            id: 'discount-id-2',
          },
        },
      },
    ],
    attributes: [
      {
        name: 'author-2',
        value: 'Test Author-2',
      },
      {
        name: 'condition',
        value: {
          label: '',
          key: '0',
        },
      },
    ],
  },
  variants: [],
  published: true,
  hasStagedChanges: false,
  taxCategory: {
    typeId: 'tax-category',
    id: 'tax-category-id-2',
  },
};

export const mockProducts = [mockProduct1, mockProduct2];
