import type { z } from 'zod';

import type { registrationSchema } from './shemas';

export type RegistrationFormFieldsValues = z.infer<typeof registrationSchema>;
