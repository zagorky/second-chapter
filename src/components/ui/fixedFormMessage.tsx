import { FormMessage } from '~components/ui/form/form';

type FixedFormMessageProps = {
  classNames?: string;
};

export const FixedFormMessage = ({ classNames = 'h-6 w-[325px]' }: FixedFormMessageProps) => {
  return (
    <div className={classNames}>
      <FormMessage />
    </div>
  );
};
