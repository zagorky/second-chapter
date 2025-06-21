import type { z } from 'zod';

import type { profileSchema, registrationSchema } from './shemas';

export type RegistrationFormSchema = z.infer<typeof registrationSchema>;
export type ProfileDataShema = z.infer<typeof profileSchema>;
