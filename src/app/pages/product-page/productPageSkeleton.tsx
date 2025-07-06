import { VISIBILITY_DELAY } from '~config/constants';
import { useTimeout } from '~hooks/useTimeout';
import { useState } from 'react';

import { Skeleton } from '~/components/ui/skeleton';

export const ProductPageSkeleton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useTimeout(() => {
    setIsVisible(true);
  }, VISIBILITY_DELAY);

  return (
    isVisible && (
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative flex flex-col gap-6">
              <Skeleton className="rounded-base bg-main m-auto h-103 w-full max-w-105 justify-items-start" />
              <Skeleton className="bg-main m-2 h-10"></Skeleton>
            </div>

            <div className="space-y-4">
              <Skeleton className="mb-2 h-27 w-full" />

              <Skeleton className="bg-main flex h-12 w-32 items-center gap-4" />

              <Skeleton className="h-6 w-40" />

              <Skeleton className="rounded-base border-border bg-background min-h-58 border-2"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
