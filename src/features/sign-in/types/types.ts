import type { loginSchema } from '~features/sign-in/types/schemas';
import type { z } from 'zod';

export type LoginFormType = z.infer<typeof loginSchema>;
