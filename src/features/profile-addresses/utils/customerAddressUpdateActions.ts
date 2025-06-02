import type { AddressDraft, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

import { apiInstance } from '~/app/API/apiBuilder';

export const updateAddress = async (parameters: {
  addressId: string;
  addressData: {
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
  };
  setShipping: boolean;
  setBilling: boolean;
  makeDefaultShipping: boolean;
  makeDefaultBilling: boolean;
}): Promise<void> => {
  const { addressId, addressData, setShipping, setBilling, makeDefaultShipping, makeDefaultBilling } = parameters;

  const response = await apiInstance.root.me().get().execute();
  const customer = response.body;
  const version = customer.version;

  const currentIsShipping = customer.shippingAddressIds?.includes(addressId) ?? false;
  const currentIsBilling = customer.billingAddressIds?.includes(addressId) ?? false;
  const currentIsDefaultShipping = customer.defaultShippingAddressId === addressId;
  const currentIsDefaultBilling = customer.defaultBillingAddressId === addressId;

  const addressDraft: AddressDraft = {
    ...addressData,
    country: addressData.country,
  };

  const actions: MyCustomerUpdateAction[] = [
    {
      action: 'changeAddress',
      addressId,
      address: addressDraft,
    },
  ];

  if (setShipping && !currentIsShipping) {
    actions.push({ action: 'addShippingAddressId', addressId });
  }

  if (!setShipping && currentIsShipping) {
    actions.push({ action: 'removeShippingAddressId', addressId });
  }

  if (setBilling && !currentIsBilling) {
    actions.push({ action: 'addBillingAddressId', addressId });
  }
  if (!setBilling && currentIsBilling) {
    actions.push({ action: 'removeBillingAddressId', addressId });
  }

  if (makeDefaultShipping && !currentIsDefaultShipping) {
    actions.push({ action: 'setDefaultShippingAddress', addressId });
  }
  if (!makeDefaultShipping && currentIsDefaultShipping) {
    actions.push({ action: 'setDefaultShippingAddress' });
  }

  if (makeDefaultBilling && !currentIsDefaultBilling) {
    actions.push({ action: 'setDefaultBillingAddress', addressId });
  }
  if (!makeDefaultBilling && currentIsDefaultBilling) {
    actions.push({ action: 'setDefaultBillingAddress' });
  }

  await apiInstance.root
    .me()
    .post({
      body: {
        version,
        actions,
      },
    })
    .execute();
};
