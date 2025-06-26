import { SignInForm } from '~features/sign-in/components/signInForm';
import { withDataTestId } from '~utils/helpers';

const SignInPage = () => {
  return (
    <div>
      <h1 className={'text-primary heading-1 sr-only'} {...withDataTestId('signin-header')}>
        Sign in
      </h1>
      <SignInForm {...withDataTestId('signin-form')} />
    </div>
  );
};

export default SignInPage;
