import type { CustomerSignInResult } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/ts-client';

import type { CustomCustomerDraft } from '../types/customCustomerDraft';

import { apiInstance } from '../apiBuilder';

export async function createCustomer(
  customerDraft: CustomCustomerDraft
): Promise<{ success: true; payload: ClientResponse<CustomerSignInResult> } | { success: false; error: unknown }> {
  try {
    const payload = await apiInstance.root.me().signup().post({ body: customerDraft }).execute();

    return { success: true, payload };
  } catch (error) {
    return { success: false, error };
  }
}
