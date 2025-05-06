import { SignInForm } from '~/components/ui/sign-in-form/signInForm';

const SignInPage = () => {
  document.title = 'Second Chapter Store | Sign In';

  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className={'text-primary heading-1'}>Sign in</h1>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
