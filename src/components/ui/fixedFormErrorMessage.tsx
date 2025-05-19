import type { ReactNode } from 'react';

import { FormMessage } from '~components/ui/form/form';

type FixedFormErrorMessageProps = {
  classNames?: string;
  children?: ReactNode;
};

export const FixedFormErrorMessage = ({ classNames = 'h-6 ', children }: FixedFormErrorMessageProps) => {
  return (
    <div className={classNames}>
      <FormMessage>{children}</FormMessage>
    </div>
  );
};
