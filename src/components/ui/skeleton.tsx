import { cn } from '~/lib/utilities';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('rounded-base bg-secondary-background border-border animate-pulse border-2', className)}
      {...props}
    />
  );
}

export { Skeleton };
