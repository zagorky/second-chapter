import { useState } from 'react';

import type { CustomCustomerDraft } from '~/app/API/types/customCustomerDraft';

import { apiInstance } from '~/app/API/apiBuilder';
import { Button } from '~/components/ui/button/button';
import { Spinner } from '~/components/ui/spinner/spinner';
import { withDataTestId } from '~/utils/helpers';

import { signupCustomer } from './examples/signupCustomer';

const RANDOM_POSTFIX = crypto.randomUUID();

const customerDraft: CustomCustomerDraft = {
  email: `example${RANDOM_POSTFIX}@gmail.com`,
  password: 'password',
  firstName: 'Kuryonok',
  lastName: 'Savrukhin',
  dateOfBirth: '4025-07-31',
  addresses: [
    {
      country: 'GB',
      city: 'any string',
      streetName: 'any string',
      postalCode: 'any string',
    },
    {
      country: 'GB',
      city: 'any string',
      streetName: 'any string',
      postalCode: 'any string',
    },
  ],
  defaultBillingAddress: 0,
  billingAddresses: [0],
  shippingAddresses: [1],
};

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    void (async () => {
      setIsLoading(true);
      try {
        apiInstance.logout();
        await signupCustomer(customerDraft);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className={'text-primary heading-1'} {...withDataTestId('signup-header')}>
        Sign Up
      </h1>
      <Button onClick={handleClick} variant="default" disabled={isLoading} className="min-w-[10rem]">
        {isLoading ? <Spinner size="md" /> : 'Begin your journey'}
      </Button>
    </div>
  );
};

export default SignUpPage;
