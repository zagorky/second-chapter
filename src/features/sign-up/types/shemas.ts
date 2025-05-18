import { emailSchema, passwordSchema } from '~features/sign-in/types/schemas';
import { z } from 'zod';

const MIN_LENGTH = 1;
const MAX_LENGTH = 50;
const MIN_POSTALCODE_LENGTH = 5;
const MAX_POSTALCODE_LENGTH = 8;

const nameSchema = z
  .string()
  .min(MIN_LENGTH, 'This field cannot be empty')
  .max(MAX_LENGTH)
  .refine((value) => /^[A-Za-z]*$/.test(value), {
    message: 'Please use only letters from the Latin alphabet.',
  })
  .refine((value) => /^[A-Z][a-z]*$/.test(value), {
    message: 'The field must begin with an uppercase letter, the rest are lowercase',
  });

const addressSchema = z
  .string()
  .min(MIN_LENGTH, 'This field cannot be empty')
  .max(MAX_LENGTH)
  .refine((value) => /^[^,]/.test(value), {
    message: "The text shouldn't begin with a comma",
  })
  .refine((value) => /^[A-Za-z0-9, ]*$/.test(value), {
    message: 'Please don’t use special characters like @, #, $, %, etc',
  })
  .refine((value) => /^(?!,)[A-Z].*/.test(value), {
    message: 'Please start with a capital letter',
  });

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
    message: 'Please don’t use special characters like @, #, $, %, etc',
  })
  .refine((value) => value === value.trim(), {
    message: 'Please remove any spaces at the beginning or end of the postcodeNo spaces allowed at the start or end',
  })
  .refine((value) => /^(GIR ?0AA|[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})$/.test(value), {
    message: 'Enter a valid UK postcode, such as: NW8 9AY, EC1A 1BB, M1 1AE',
  });

export const registrationSchema = z.object({
  firstname: nameSchema,
  lastname: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  addressShipping: addressSchema,
  cityShipping: cityShema,
  postalCodeShipping: postalCodeShema,
  addressBilling: addressSchema,
  cityBilling: cityShema,
  postalCodeBilling: postalCodeShema,
});
