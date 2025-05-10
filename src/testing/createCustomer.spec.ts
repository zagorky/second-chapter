import type { CustomCustomerDraft } from '~app/API/types/customCustomerDraft';

import { createCustomer } from '~app/API/utils/createCustomer';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const executeMock = vi.fn();
const postMock = vi.fn(() => ({ execute: executeMock }));
const signupMock = vi.fn(() => ({ post: postMock }));

vi.mock('~/app/API/apiBuilder', () => ({
  apiInstance: {
    root: {
      me: () => ({
        signup: signupMock,
      }),
    },
  },
}));

const draft: CustomCustomerDraft = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: [
    {
      country: '',
      city: '',
      streetName: '',
      postalCode: '',
    },
  ],
  billingAddresses: [0],
  shippingAddresses: [0],
};

describe('createCustomer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sends correct body and returns success payload', async () => {
    const fakeResponse = { body: { customer: { id: '123', email: draft.email } } };

    executeMock.mockResolvedValueOnce(fakeResponse);

    const result = await createCustomer(draft);

    expect(signupMock).toHaveBeenCalled();
    expect(postMock).toHaveBeenCalledWith({ body: draft });
    expect(executeMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ success: true, payload: fakeResponse });
  });

  it('propagates error correctly', async () => {
    const error = new Error('fail');

    executeMock.mockRejectedValueOnce(error);

    const result = await createCustomer(draft);

    expect(result).toEqual({ success: false, error });
    expect(postMock).toHaveBeenCalledWith({ body: draft });
  });
});
