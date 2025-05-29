export const facetRequests = {
  categories: 'categories.id counting products',
  conditions: 'variants.attributes.condition.label',
  sale: 'variants.prices.discounted.value.centAmount',
  price: 'variants.price.centAmount',
} as const;
