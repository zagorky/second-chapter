import type { QueryParam } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';

import { apiInstance } from '~app/API/apiBuilder';

type FetchProductsParameters = {
  [key: string]: QueryParam;
  markMatchingVariants?: boolean;
  fuzzy?: boolean;
  fuzzyLevel?: number;
  'filter.query'?: string | string[];
  filter?: string | string[];
  facet?: string | string[];
  'filter.facets'?: string | string[];
  expand?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceCustomerGroupAssignments?: string | string[];
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
};

export const fetchFacets = async (parameters: FetchProductsParameters) => {
  const response = await apiInstance.root.productProjections().search().get({ queryArgs: parameters }).execute();

  return response.body.facets ?? {};
};
