import type { ProductProjection } from '@commercetools/platform-sdk';

import { apiInstance } from '~app/API/apiBuilder';

export const fetchProductByKey = async (key: string): Promise<ProductProjection> => {
  const response = await apiInstance.root
    .productProjections()

    .withKey({ key: key })
    .get()
    .execute();

  return response.body;
};
