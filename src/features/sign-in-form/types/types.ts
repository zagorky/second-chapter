import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;

const passwordSchema = z.string().min(MIN_PASSWORD_LENGTH, { message: 'Password must be at least 8 characters long' });

const emailSchema = z.string().email();

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormType = z.infer<typeof loginSchema>;
