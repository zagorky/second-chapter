import type { CustomCustomerDraft } from '~/app/API/types/customCustomerDraft';

import { apiInstance } from '~/app/API/apiBuilder';
import { Button } from '~/components/ui/button/button';

import { signupCustomer } from './examples/signupCustomer';

const RANDOM_POSTFIX = crypto.randomUUID();
const ANY_VALUE_ACCEPTED = 'any value';

const customerDraft: CustomCustomerDraft = {
  email: `example${RANDOM_POSTFIX}@gmail.com`,
  password: 'password',
  firstName: 'Kuryonok',
  lastName: 'Savrukhin',
  dateOfBirth: '4025-07-31',
  addresses: [
    {
      country: 'GB',
      city: ANY_VALUE_ACCEPTED,
      streetName: ANY_VALUE_ACCEPTED,
      postalCode: ANY_VALUE_ACCEPTED,
    },
    {
      country: 'GB',
      city: ANY_VALUE_ACCEPTED,
      streetName: ANY_VALUE_ACCEPTED,
      postalCode: ANY_VALUE_ACCEPTED,
    },
  ],
  defaultBillingAddress: 0,
  billingAddresses: [0],
  shippingAddresses: [1],
};

export const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className={'text-primary heading-1'}>Sign Up</h1>
      <Button
        onClick={() => {
          apiInstance.logout();
          void signupCustomer(customerDraft);
        }}
      >
        {'Begin your journey'}
      </Button>
    </div>
  );
};

export default SignUpPage;
