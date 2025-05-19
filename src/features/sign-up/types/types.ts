import type { z } from 'zod';

import type { registrationSchema } from './shemas';

export type RegistrationFormSchema = z.infer<typeof registrationSchema>;
