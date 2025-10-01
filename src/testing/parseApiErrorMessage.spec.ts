import { describe, it, expect } from 'vitest';

import { API_ERRORS, API_ERROR_MESSAGES } from '~/app/API/config/apiErrors';
import { parseApiErrorMessage } from '~/app/API/utils/parseApiErrorMessage';

const EXISTENT_MESSAGE = 'There is already an existing customer with the provided email.';
const NOT_EXISTENT_MESSAGE = 'non_existent_code';
const FALLBACK_MESSAGE = 'fallbackMessage';

describe('parseApiErrorMessage', () => {
  it('should return message mapped in API_ERRORS', () => {
    const error = { message: EXISTENT_MESSAGE };

    const result = parseApiErrorMessage(error);

    expect(result).toBe(API_ERROR_MESSAGES[EXISTENT_MESSAGE]);
  });

  it('should return error message if there is no mapped code in API_ERRORS', () => {
    const error = { message: NOT_EXISTENT_MESSAGE };

    const result = parseApiErrorMessage(error, FALLBACK_MESSAGE);

    expect(result).toBe(NOT_EXISTENT_MESSAGE);
  });

  it('should return fallback message if error message is not provided', () => {
    const error = {};

    const result = parseApiErrorMessage(error, FALLBACK_MESSAGE);

    expect(result).toBe(FALLBACK_MESSAGE);
  });

  it('should return unknown error message if there is no mapped code in API_ERRORS and no fallback message is provided', () => {
    const error = {};

    const result = parseApiErrorMessage(error);

    expect(result).toBe(API_ERRORS.UNKNOWN);
  });
});
