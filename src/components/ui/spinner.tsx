import { cn } from '~/lib/utilities';

type SpinnerProps = {
  size?: number;
  className?: string;
};

export const Spinner = ({ size = 5, className = '' }: SpinnerProps) => {
  const sizeClasses = `w-${String(size)} h-${String(size)}`;

  return (
    <div
      className={cn(
        'border-main animate-spin rounded-full border-2 border-dashed transition-opacity duration-300',
        sizeClasses,
        className
      )}
    />
  );
};
