import type { FacetResults, TermFacetResult } from '@commercetools/platform-sdk';

import { facetRequests } from '~features/filters/configs/facetRequests';
import { fetchFacets } from '~features/filters/utils/fetchFacets';
import { getPriceFilterDataFromFacets } from '~features/filters/utils/getPriceFilterData';
import { isString } from '~utils/helpers';
import useSWR from 'swr';

const EMPTY_TERM_FACET: TermFacetResult = {
  type: 'terms',
  missing: 0,
  total: 0,
  other: 0,
  terms: [],
  dataType: 'text',
};

export const useFacetsData = () => {
  const actualParameters = {
    limit: 0,
    facet: [facetRequests.conditions, facetRequests.price],
  };

  const { data, isLoading: isFacetLoading } = useSWR<FacetResults, Error>(actualParameters, fetchFacets);

  const getTermFacet = (key: string) => {
    const facet = data?.[key];

    return isTermFacet(facet) ? facet : null;
  };

  const conditions = getTermFacet(facetRequests.conditions) ?? EMPTY_TERM_FACET;
  const price = getTermFacet(facetRequests.price) ?? EMPTY_TERM_FACET;

  const conditionsData = conditions.terms.map((term) => ({
    id: isString(term.term) ? term.term : '',
    label: isString(term.term) ? term.term : '',
  }));

  const priceRange = getPriceFilterDataFromFacets(price);
  const prices = {
    min: priceRange.minPrice,
    max: priceRange.maxPrice,
  };

  return {
    conditions: conditionsData,
    price: prices,
    isFacetLoading,
  };
};

const isTermFacet = (facet: unknown): facet is TermFacetResult => {
  return !!facet && typeof facet === 'object' && 'type' in facet && facet.type === 'terms';
};
