import type { TermFacetResult } from '@commercetools/platform-sdk';

export const getPriceFilterDataFromFacets = (facets: TermFacetResult) => {
  const priceTerms = facets.terms;
  const prices = priceTerms.map((term) => Number(term.term));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return {
    minPrice,
    maxPrice,
  };
};
