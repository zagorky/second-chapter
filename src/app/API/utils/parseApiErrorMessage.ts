import { z } from 'zod';

import { API_ERROR_MESSAGES, API_ERRORS } from '../config/apiErrors';

const ErrorSchema = z.object({
  message: z.string(),
});

const isApiErrorKey = (key: string): key is keyof typeof API_ERROR_MESSAGES => {
  return key in API_ERROR_MESSAGES;
};

export const parseApiErrorMessage = (error: unknown, fallbackMessage?: string): string => {
  const parsed = ErrorSchema.safeParse(error);

  if (parsed.success) {
    const { message } = parsed.data;

    if (isApiErrorKey(message)) {
      return API_ERROR_MESSAGES[message];
    }

    return message;
  }

  return fallbackMessage ?? API_ERRORS.UNKNOWN;
};
