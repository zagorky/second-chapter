import { z } from 'zod';

import { API_ERRORS } from '../config/apiErrors';

type ApiErrorCode = keyof typeof API_ERRORS;
const ErrorSchema = z.object({
  code: z.custom<ApiErrorCode>((value) => typeof value === 'string' && value in API_ERRORS).optional(),
  message: z.string(),
});

export const parseApiErrorMessage = (error: unknown, fallbackMessage?: string): string => {
  const result = ErrorSchema.safeParse(error);

  if (result.success) {
    const { code, message } = result.data;

    return code ? API_ERRORS[code] : message;
  }

  return fallbackMessage ?? API_ERRORS.UNKNOWN;
};
