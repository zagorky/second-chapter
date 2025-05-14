import type { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk';
import type { Client } from '@commercetools/ts-client';

import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { API_CONFIG } from '../config/apiConfig';

export const verifyUnauthenticatedClient = async (
  client: Client
): Promise<{ success: true; payload: ProductProjectionPagedQueryResponse } | { success: false; error: unknown }> => {
  const root = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: API_CONFIG.PROJECT_KEY,
  });

  try {
    const response = await root
      .productProjections()
      .get({ queryArgs: { limit: 1 } })
      .execute();

    return { success: true, payload: response.body };
  } catch (error: unknown) {
    return { success: false, error };
  }
};
