import { withDataTestId } from '~utils/helpers';

import { SignUpForm } from '~/features/sign-up/components/signUpForm';

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className={'text-primary heading-1'} {...withDataTestId('signin-header')}>
        Sign in
      </h1>
      <SignUpForm {...withDataTestId('signin-form')} />
    </div>
  );
};

export default SignInPage;
