import { Button } from '~components/ui/button/button';

import type { CustomCustomerDraft } from '~/app/API/types/customCustomerDraft';

import { Spinner } from '~/components/ui/spinner/spinner';

import { useSignupCustomer } from '../hooks/useSignUp';

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

const SignUpForm = () => {
  const { signupCustomer, isLoading } = useSignupCustomer();

  const handleClick = () => {
    void signupCustomer(customerDraft);
  };

  return (
    <form className="flex flex-col items-center gap-2">
      <Button onClick={handleClick} variant="default" disabled={isLoading} className="min-w-[10rem]">
        {isLoading ? <Spinner size="md" /> : 'Begin your journey'}
      </Button>
    </form>
  );
};

export default SignUpForm;
