import { VISIBILITY_DELAY } from '~config/constants';
import { useTimeout } from '~hooks/useTimeout';
import { useState } from 'react';

import { Skeleton } from '../skeleton';

export const MainPageSkeleton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useTimeout(() => {
    setIsVisible(true);
  }, VISIBILITY_DELAY);

  return (
    isVisible && (
      <div className="space-y-12">
        <div className="flex flex-col-reverse gap-6 p-6 lg:grid lg:grid-cols-[2fr_1fr] lg:gap-12">
          <div>
            <Skeleton className="mb-2 h-28 w-full max-w-xl" />
            <Skeleton className="mb-6 h-14 w-full max-w-sm" />
            <Skeleton className="mb-7 h-16 w-full max-w-50" />
            <Skeleton className="bg-main h-12 w-full max-w-42" />
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-84 w-98" />
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="mx-auto h-76 w-full max-w-7xl" />
          <div className="flex justify-center gap-2"></div>
        </div>
      </div>
    )
  );
};
