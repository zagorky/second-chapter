import type { MyCustomerDraft, BaseAddress } from '@commercetools/platform-sdk';

import type { CountryCodeISO3166Alpha2 } from './countryCode';

type CustomCustomerAddressRequired = {
  country: CountryCodeISO3166Alpha2;
  streetName: string;
  postalCode: string;
  city: string;
};

type CustomCustomerAddress = Omit<BaseAddress, keyof CustomCustomerAddressRequired> & CustomCustomerAddressRequired;

type CustomCustomerDraftRequired = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: CustomCustomerAddress[];
  billingAddresses: number[];
  shippingAddresses: number[];
};

export type CustomCustomerDraft = Omit<MyCustomerDraft, keyof CustomCustomerDraftRequired> &
  CustomCustomerDraftRequired;
