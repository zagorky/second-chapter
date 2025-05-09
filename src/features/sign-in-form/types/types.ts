import type { loginSchema } from '~features/sign-in-form/types/schemas';
import type { z } from 'zod';

export type LoginFormType = z.infer<typeof loginSchema>;
