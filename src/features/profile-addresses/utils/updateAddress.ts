import type { AddressDraft, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

import { apiInstance } from '~/app/API/apiBuilder';

export const updateAddress = async (
  addressId: string,
  updatedAddressData: {
    streetName?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  }
): Promise<void> => {
  const customerResponse = await apiInstance.root.me().get().execute();
  const version = customerResponse.body.version;

  const addressDraft: AddressDraft = {
    ...updatedAddressData,
    country: updatedAddressData.country ?? 'GB',
  };

  const updateActions: MyCustomerUpdateAction[] = [
    {
      action: 'changeAddress',
      addressId,
      address: addressDraft,
    },
  ];

  await apiInstance.root
    .me()
    .post({
      body: {
        version,
        actions: updateActions,
      },
    })
    .execute();
};
