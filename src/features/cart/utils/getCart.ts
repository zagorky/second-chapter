import type { Cart } from '@commercetools/platform-sdk';

import { HTTP_STATUSES } from '~config/httpStatuses';
import { normalizeError } from '~utils/normalizeError';

import { createCart } from '~/features/cart/utils/createCart';
import { getActiveCart } from '~/features/cart/utils/getActiveCart';

export const getCart = async (): Promise<Cart> => {
  try {
    return await getActiveCart();
  } catch (error: unknown) {
    const normalizedError = normalizeError(error);

    if ('statusCode' in normalizedError && normalizedError.statusCode === HTTP_STATUSES.NOT_FOUND) {
      return await createCart();
    }
    throw normalizedError;
  }
};
