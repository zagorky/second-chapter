import { SigninForm } from '~/components/ui/signinForm';

export const SigninPage = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className={'text-primary heading-1'}>Sign in</h1>
      <SigninForm></SigninForm>
    </div>
  );
};
