import type { MyCustomerDraft, BaseAddress } from '@commercetools/platform-sdk';

type RequiredBaseAddressKeys = 'country' | 'streetName' | 'postalCode' | 'city';
type RequiereCustomerDraftKeys = 'email' | 'password' | 'firstName' | 'lastName' | 'dateOfBirth' | 'addresses';

type CustomCustomerAddress = BaseAddress & Required<Pick<BaseAddress, RequiredBaseAddressKeys>>;

export type CustomCustomerDraft = Omit<MyCustomerDraft, 'addresses'> &
  Required<Pick<MyCustomerDraft, RequiereCustomerDraftKeys>> & {
    addresses: CustomCustomerAddress[];
    billingAddresses: number[];
    shippingAddresses: number[];
  };
