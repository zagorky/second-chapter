import type { z } from 'zod';

import type { registrationSchema } from './shemas';

export type RegistrationFormSchema = z.infer<typeof registrationSchema>;

export type RegistrationFormFieldsValues = RegistrationFormSchema & {
  countryShipping: 'GB';
  countryBilling: 'GB';
  shippingIsDefaultShipping?: boolean;
  shippingIsDefaultBilling?: boolean;
  billingIsDefaultBilling?: boolean;
};
