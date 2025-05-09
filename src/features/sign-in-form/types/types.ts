import { z } from 'zod';

const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 15;

const emailSchema = z.string().min(1, 'Email cannot be empty').email('Invalid email format');

const passwordSchema = z
  .string()
  .min(MIN_PASSWORD_LENGTH, { message: `Password must be at least ${MIN_PASSWORD_LENGTH.toString()} characters long` })
  .max(MAX_PASSWORD_LENGTH, { message: `Password  must be no more than ${MAX_PASSWORD_LENGTH.toString()} characters` })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password must contain at least one uppercase letter (A-Z)',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password must contain at least one lowercase letter (a-z)',
  })
  .refine((password) => /[0-9]/.test(password), { message: 'Password must contain at least one digit (0-9)' })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'Password must contain at least one special character (e.g., !@#$%^&*)',
  })
  .refine((password) => !/\s/.test(password), {
    message: 'Password must not contain any whitespace characters',
  })
  .refine((password) => password === password.trim(), {
    message: 'Password must not contain leading or trailing whitespace',
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormType = z.infer<typeof loginSchema>;
