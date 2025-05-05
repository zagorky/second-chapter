import { SignUpForm } from '~/components/ui/sign-up-form/signUpForm';

export const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className={'text-primary heading-1'}>Sign Up</h1>
      <SignUpForm />
    </div>
  );
};
