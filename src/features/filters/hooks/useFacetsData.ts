import type { FacetResults, TermFacetResult } from '@commercetools/platform-sdk';

import { facetRequests } from '~features/filters/configs/facetRequests';
import { fetchFacets } from '~features/filters/utils/fetchFacets';
import useSWR from 'swr';

export const useFacetsData = () => {
  const actualParameters = {
    limit: 0,
    facet: [facetRequests.conditions, facetRequests.price],
  };

  const { data } = useSWR<FacetResults, Error>(actualParameters, fetchFacets);

  const getTermFacet = (key: string): TermFacetResult | null => {
    const facet = data?.[key];

    return isTermFacet(facet) ? facet : null;
  };

  return {
    conditions: getTermFacet(facetRequests.conditions),
    price: getTermFacet(facetRequests.price),
  };
};

const isTermFacet = (facet: unknown): facet is TermFacetResult => {
  return !!facet && typeof facet === 'object' && 'type' in facet && facet.type === 'terms';
};
