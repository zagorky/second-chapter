import { withDataTestId } from '~utils/helpers';

import { SignUpForm } from '~/features/sign-up/components/signUpForm';

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className={'text-primary heading-1'} {...withDataTestId('signup-header')}>
        Sign Up
      </h1>
      <SignUpForm {...withDataTestId('signup-form')} />
    </div>
  );
};

export default SignUpPage;
