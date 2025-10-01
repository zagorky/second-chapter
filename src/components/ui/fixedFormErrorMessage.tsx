import type { ReactNode } from 'react';

import { FormMessage } from '~components/ui/form/form';

type FixedFormErrorMessageProps = {
  classNames?: string;
  children?: ReactNode;
};

export const FixedFormErrorMessage = ({
  classNames = 'sm:min-h-[1rem] min-h-[0.5rem] mx-auto',
  children,
}: FixedFormErrorMessageProps) => {
  return (
    <div className={classNames}>
      <FormMessage>{children}</FormMessage>
    </div>
  );
};
