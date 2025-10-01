import type { Cart } from '@commercetools/platform-sdk';

import { HTTP_STATUSES } from '~config/httpStatuses';
import { createCart } from '~features/cart/utils/createCart';
import { getActiveCart } from '~features/cart/utils/getActiveCart';
import { normalizeError } from '~utils/normalizeError';
import { describe, it, expect, vi, afterEach } from 'vitest';

import { getCart } from './getCart';

vi.mock('~features/cart/utils/getActiveCart');
vi.mock('~features/cart/utils/createCart');
vi.mock('~utils/normalizeError');

const mockedGetActiveCart = vi.mocked(getActiveCart);
const mockedCreateCart = vi.mocked(createCart);
const mockedNormalizeError = vi.mocked(normalizeError);

const fakeCart: Cart = {
  id: 'cart-id',
  version: 1,
  createdAt: '',
  lastModifiedAt: '',
  lineItems: [],
  customLineItems: [],
  totalPrice: {
    type: 'centPrecision',
    currencyCode: '',
    centAmount: 0,
    fractionDigits: 2,
  },
  taxMode: '',
  taxRoundingMode: '',
  taxCalculationMode: '',
  inventoryMode: '',
  cartState: '',
  shippingMode: '',
  shipping: [],
  itemShippingAddresses: [],
  discountCodes: [],
  directDiscounts: [],
  refusedGifts: [],
  origin: '',
};

const notFoundError = {
  message: 'Not found',
  statusCode: HTTP_STATUSES.NOT_FOUND,
  name: 'NotFoundError',
};

const unknownError = {
  message: 'unknown error',
  name: 'UnknownError',
};

describe('getCart', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should return active cart when getActiveCart succeeds', async () => {
    mockedGetActiveCart.mockResolvedValue(fakeCart);

    const result = await getCart();

    expect(result).toBe(fakeCart);
    expect(getActiveCart).toHaveBeenCalledTimes(1);
    expect(createCart).not.toHaveBeenCalled();
  });

  it('should create a new cart when there is no active cart', async () => {
    mockedGetActiveCart.mockRejectedValue(notFoundError);
    mockedNormalizeError.mockReturnValue(notFoundError);
    mockedCreateCart.mockResolvedValue(fakeCart);

    const result = await getCart();

    expect(normalizeError).toHaveBeenCalled();
    expect(createCart).toHaveBeenCalledTimes(1);
    expect(result).toBe(fakeCart);
  });

  it('should throw normalized error when error is not 404', async () => {
    mockedGetActiveCart.mockRejectedValue(new Error('error'));
    mockedNormalizeError.mockReturnValue(unknownError);

    await expect(getCart()).rejects.toEqual(unknownError);
    expect(createCart).not.toHaveBeenCalled();
  });
});
