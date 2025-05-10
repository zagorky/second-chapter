import { describe, it, expect } from 'vitest';

import { API_ERRORS } from '~/app/API/config/apiErrors';
import { parseApiErrorMessage } from '~/app/API/utils/parseApiErrorMessage';

const existent_code = 'invalid_customer_account_credentials';
const not_existent_code = 'non_existent_code';
const fallbackMessage = 'fallbackMessage';

describe('parseApiErrorMessage', () => {
  it('should return message mapped in API_ERRORS', () => {
    const error = { code: existent_code };

    const result = parseApiErrorMessage(error);

    expect(result).toBe(API_ERRORS[existent_code]);
  });

  it('should return fallback message if there is no mapped code in API_ERRORS', () => {
    const error = { code: not_existent_code };

    const result = parseApiErrorMessage(error, fallbackMessage);

    expect(result).toBe(fallbackMessage);
  });

  it('should return unknown error message if there is no mapped code in API_ERRORS and no fallback message is provided', () => {
    const error = {};

    const result = parseApiErrorMessage(error);

    expect(result).toBe(API_ERRORS.UNKNOWN);
  });
});
