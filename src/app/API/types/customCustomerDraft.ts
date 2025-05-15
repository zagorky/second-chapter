import type { MyCustomerDraft, BaseAddress } from '@commercetools/platform-sdk';

import type { WithRequired } from '~/types/utils/withRequired';

type SupportedCountries = 'GB';

type RequiredBaseAddressKeys = 'country' | 'streetName' | 'postalCode' | 'city';
type RequiredCustomerDraftKeys = 'email' | 'password' | 'firstName' | 'lastName' | 'dateOfBirth';

type CustomCustomerAddress = {
  country: SupportedCountries;
} & WithRequired<BaseAddress, RequiredBaseAddressKeys>;

export type CustomCustomerDraft = {
  addresses: CustomCustomerAddress[];
  billingAddresses: number[];
  shippingAddresses: number[];
} & WithRequired<Omit<MyCustomerDraft, 'addresses'>, RequiredCustomerDraftKeys>;
