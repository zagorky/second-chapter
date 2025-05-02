import { SignInForm } from '~/components/ui/sign-in-form/signInForm';

export const SignInPage = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className={'text-primary heading-1'}>Sign in</h1>
      <SignInForm></SignInForm>
    </div>
  );
};
