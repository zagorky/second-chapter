import { FormMessage } from '~components/ui/form';

type FixedFormMessageProps = {
  styles?: string;
};

export const FixedFormMessage = ({ styles = 'h-6 w-[325px]' }: FixedFormMessageProps) => {
  return (
    <div className={styles}>
      <FormMessage />
    </div>
  );
};
