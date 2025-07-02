import { Skeleton } from '~components/ui/skeleton';
import { VISIBILITY_DELAY } from '~config/constants';
import { useTimeout } from '~hooks/useTimeout';
import { useState } from 'react';

export const CartPageSkeleton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useTimeout(() => {
    setIsVisible(true);
  }, VISIBILITY_DELAY);

  return (
    isVisible && (
      <div className="flex flex-grow flex-col justify-between gap-8">
        <div className="grid gap-4">
          <div className="flex justify-end">
            <Skeleton className="h-10 w-full max-w-23" />
          </div>
          <ul className="grid gap-4">
            <Skeleton className="bg-background relative flex h-90 justify-between gap-4 p-4 sm:h-48" />
          </ul>
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="bg-main h-10 w-full max-w-19" />
        </div>

        <div className="grid gap-6">
          <Skeleton className="h-10 w-full max-w-36 items-start" />
          <div className="space-y-3">
            <Skeleton className="relative flex h-46 justify-between gap-4 p-4" />
          </div>
          <Skeleton className="bg-main h-10 w-full max-w-34 justify-self-end" />
        </div>
      </div>
    )
  );
};
