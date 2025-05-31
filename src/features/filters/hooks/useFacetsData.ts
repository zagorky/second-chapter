import type { FacetResults, TermFacetResult } from '@commercetools/platform-sdk';

import { facetRequests } from '~features/filters/configs/facetRequests';
import { fetchFacets } from '~features/filters/utils/fetchFacets';
import useSWR from 'swr';

export const useFacetsData = () => {
  const actualParameters = {
    limit: 0,
    facet: [facetRequests.categories, facetRequests.conditions, facetRequests.price, facetRequests.sale],
  };

  const { data, error: facetsError } = useSWR<FacetResults, Error>(actualParameters, fetchFacets);

  const getTermFacet = (key: string): TermFacetResult | null => {
    const facet = data?.[key];

    return isTermFacet(facet) ? facet : null;
  };

  return {
    categories: getTermFacet(facetRequests.categories),
    conditions: getTermFacet(facetRequests.conditions),
    price: getTermFacet(facetRequests.price),
    sale: getTermFacet(facetRequests.sale),
    facetsError,
  };
};

const isTermFacet = (facet: unknown): facet is TermFacetResult => {
  return !!facet && typeof facet === 'object' && 'type' in facet && facet.type === 'terms';
};
