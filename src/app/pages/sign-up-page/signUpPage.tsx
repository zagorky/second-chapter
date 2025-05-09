import { withDataTestId } from '~utils/helpers';

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className={'text-primary heading-1'} {...withDataTestId('signup-header')}>
        Sign Up
      </h1>
    </div>
  );
};

export default SignUpPage;
