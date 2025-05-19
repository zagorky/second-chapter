import { emailSchema, passwordSchema } from '~features/sign-in/types/schemas';
import dayjs from 'dayjs';
import { z } from 'zod';

const MIN_LENGTH = 1;
const MAX_LENGTH = 50;
const MIN_POSTALCODE_LENGTH = 5;
const MAX_POSTALCODE_LENGTH = 8;
const MIN_AGE = 18;
const MAX_AGE = 122;

const nameSchema = z
  .string()
  .min(MIN_LENGTH, 'This field cannot be empty')
  .max(MAX_LENGTH)
  .refine((value) => /^[A-Za-z]*$/.test(value), {
    message: 'Please use only letters from the Latin alphabet.',
  });

const streetSchema = z.string().min(MIN_LENGTH, 'This field cannot be empty').max(MAX_LENGTH);

const cityShema = z
  .string()
  .min(MIN_LENGTH, 'This field cannot be empty')
  .max(MAX_LENGTH)
  .refine((value) => /^[A-Za-z]*$/.test(value), {
    message: 'Please use only letters from the Latin alphabet.',
  });

const postalCodeShema = z
  .string()
  .min(MIN_POSTALCODE_LENGTH, 'Enter a valid UK postcode, such as: NW8 9AY, EC1A 1BB, M1 1AE')
  .max(MAX_POSTALCODE_LENGTH)
  .refine((value) => value === value.toUpperCase(), { message: 'Please use capital letters for your postcode' })
  .refine((value) => /^[A-Za-z0-9, ]*$/.test(value), {
    message: 'Please use only letters from the Latin alphabet.',
  })
  .refine((value) => value === value.trim(), {
    message: 'Please remove any spaces at the beginning or end of the postcodeNo spaces allowed at the start or end',
  })
  .refine((value) => /^(GIR ?0AA|[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})$/.test(value), {
    message: 'Enter a valid UK postcode, such as: NW8 9AY, EC1A 1BB, M1 1AE',
  });

const dateOfBirthSchema = z
  .string()
  .nonempty({ message: 'Date of birth is required' })
  .refine(
    (value) => {
      const today = dayjs();
      const birthDate = dayjs(value);

      const age = today.diff(birthDate, 'year');

      return age >= MIN_AGE && age <= MAX_AGE;
    },
    (value) => {
      const today = dayjs();
      const birthDate = dayjs(value);

      if (birthDate.isAfter(today)) {
        return { message: 'Date of birth cannot be in the future' };
      }

      const age = today.diff(birthDate, 'year');

      if (age < MIN_AGE) {
        return { message: `You must be at least 18 years old` };
      }
      if (age > MAX_AGE) {
        return { message: `You must be at most 122 years old` };
      }

      return { message: 'Invalid date of birth' };
    }
  );
const shippingIsDefaultShippingShema = z.boolean().optional();
const shippingIsDefaultBillingShema = z.boolean().optional();
const billingIsDefaultBillingShema = z.boolean().optional();
const countryShema = z.literal('GB', {
  errorMap: () => ({ message: 'Country is required' }),
});

export const registrationSchema = z.object({
  firstname: nameSchema,
  lastname: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  streetShipping: streetSchema,
  cityShipping: cityShema,
  postalCodeShipping: postalCodeShema,
  streetBilling: streetSchema,
  cityBilling: cityShema,
  postalCodeBilling: postalCodeShema,
  dateOfBirth: dateOfBirthSchema,
  countryShipping: countryShema,
  countryBilling: countryShema,
  shippingIsDefaultShipping: shippingIsDefaultShippingShema,
  shippingIsDefaultBilling: shippingIsDefaultBillingShema,
  billingIsDefaultBilling: billingIsDefaultBillingShema,
});
