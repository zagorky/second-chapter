import { z } from 'zod';

import { API_ERRORS } from '../config/apiErrors';

type ApiErrorCode = keyof typeof API_ERRORS;
const ErrorSchema = z.object({
  code: z.custom<ApiErrorCode>((value) => typeof value === 'string' && value in API_ERRORS).optional(),
});

export const parseApiErrorMessage = (error: unknown, fallbackMessage?: string): string => {
  const result = ErrorSchema.safeParse(error);

  const code: string | undefined = result.success && result.data.code ? API_ERRORS[result.data.code] : undefined;

  return code ?? fallbackMessage ?? API_ERRORS.UNKNOWN;
};
