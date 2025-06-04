import type { QueryParam } from '@commercetools/platform-sdk/dist/declarations/src/generated/shared/utils/common-types';

import { apiInstance } from '~app/API/apiBuilder';

type FetchCategoryParameters = {
  [key: string]: QueryParam;
  expand?: string | string[];
  sort?: string | string[];
  limit?: number;
  offset?: number;
  withTotal?: boolean;
  where?: string | string[];
};

export const fetchCategory = async (parameters: FetchCategoryParameters) => {
  const response = await apiInstance.root.categories().get({ queryArgs: parameters }).execute();

  return response.body.results;
};
