import type { ReactNode } from 'react';

import { FormMessage } from '~components/ui/form/form';

type FixedFormErrorMessageProps = {
  classNames?: string;
  children?: ReactNode;
};

export const FixedFormErrorMessage = ({
  classNames = 'sm:min-h-[2.5rem] min-h-[2rem] max-w-[300px] mx-auto',
  children,
}: FixedFormErrorMessageProps) => {
  return (
    <div className={classNames}>
      <FormMessage>{children}</FormMessage>
    </div>
  );
};
