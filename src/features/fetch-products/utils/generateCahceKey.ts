import type { FetchProductsParameters } from '~features/fetch-products/utils/fetchProducts';

export const generateCacheKey = (parameters: FetchProductsParameters) => {
  return `second-chapter-products-${JSON.stringify(Object.entries(parameters).sort())}`;
};
