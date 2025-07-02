import { Skeleton } from '~components/ui/skeleton';
import { useTimeout } from '~hooks/useTimeout';
import { useState } from 'react';

const VISIBILITY_DELAY = 1000;

export const ErrorPageSkeleton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useTimeout(() => {
    setIsVisible(true);
  }, VISIBILITY_DELAY);

  return (
    isVisible && (
      <div className="m-auto flex h-[calc(100vh-200px)] w-full max-w-xl flex-col justify-center p-10">
        <div className="flex w-full flex-col gap-4 p-4">
          <Skeleton className="h-70 w-full max-w-xl py-5" />
          <Skeleton className="bg-main m-auto h-10 w-full max-w-30" />
        </div>
      </div>
    )
  );
};
