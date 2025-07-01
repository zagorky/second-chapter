import { Skeleton } from '~components/ui/skeleton';
import { VISIBILITY_DELAY } from '~config/constants';
import { useTimeout } from '~hooks/useTimeout';
import { useState } from 'react';

export const SignupPageSkeleton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useTimeout(() => {
    setIsVisible(true);
  }, VISIBILITY_DELAY);

  return (
    isVisible && (
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-12 w-full max-w-36" />
        <div className="flex w-[calc(100%-32px)] max-w-full flex-col gap-6">
          <Skeleton className="bg-background flex h-[920px] w-full items-end justify-center">
            <Skeleton className="bg-main mb-16 h-10 w-full max-w-283" />
          </Skeleton>
        </div>
      </div>
    )
  );
};
