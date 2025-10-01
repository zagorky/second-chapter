import { API_ERRORS } from '~/app/API/config/apiErrors';

export const normalizeError = (error: unknown) => (error instanceof Error ? error : new Error(API_ERRORS.UNKNOWN));
