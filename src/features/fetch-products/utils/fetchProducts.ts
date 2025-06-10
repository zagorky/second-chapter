import type { QueryParam } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';

import { apiInstance } from '~app/API/apiBuilder';

export type FetchProductsParameters = {
  [key: string]: QueryParam;
  staged?: boolean;
  priceCurrency?: string;
  priceCountry?: string;
  priceCustomerGroup?: string;
  priceCustomerGroupAssignments?: string | string[];
  priceChannel?: string;
  localeProjection?: string | string[];
  storeProjection?: string;
  expand?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  where?: string | string[];
};

export const fetchProducts = async (parameters: FetchProductsParameters) => {
  const response = await apiInstance.root.productProjections().search().get({ queryArgs: parameters }).execute();

  return response.body;
};
