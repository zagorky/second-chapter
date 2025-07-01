import { Skeleton } from '~components/ui/skeleton';
import { VISIBILITY_DELAY } from '~config/constants';
import { useTimeout } from '~hooks/useTimeout';
import { useState } from 'react';

export const SinginPageSkeleton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useTimeout(() => {
    setIsVisible(true);
  }, VISIBILITY_DELAY);

  return (
    isVisible && (
      <Skeleton className="mx-auto flex h-118 w-full max-w-[400px]">
        <div className="flex w-full flex-col items-center justify-center gap-16">
          <Skeleton className="h-10 w-full max-w-87" />
          <Skeleton className="h-10 w-full max-w-87" />
          <Skeleton className="bg-main h-10 w-full max-w-87" />
        </div>
      </Skeleton>
    )
  );
};
