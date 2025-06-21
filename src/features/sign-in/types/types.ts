import type { loginSchema } from '~features/sign-in/types/schemas';
import type { z } from 'zod';

export type LoginFormFieldValues = z.infer<typeof loginSchema>;
