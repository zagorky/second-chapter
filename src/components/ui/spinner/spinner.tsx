import { cn } from '~/lib/utilities';

import type { SpinnerSize } from './spinnerVariants';

import { spinnerVariants } from './spinnerVariants';

type SpinnerProps = {
  size?: SpinnerSize;
  className?: string;
};

export const Spinner = ({ size = 'md', className }: SpinnerProps) => {
  return <div className={cn(spinnerVariants({ size }), className)} />;
};
