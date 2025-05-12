import type { CountryCodeISO3166Alpha2 } from './countryCode';

type CustomCustomerAddress = {
  country: CountryCodeISO3166Alpha2;
  streetName: string;
  postalCode: string;
  city: string;
};

type index = 0 | 1;

export type CustomCustomerDraft = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: CustomCustomerAddress[];
  defaultBillingAddress?: index;
  defaultShippingAddress?: index;
  billingAddresses: index[];
  shippingAddresses: index[];
};
