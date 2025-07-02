import { Skeleton } from '~components/ui/skeleton';
import { ITEMS_PER_PAGE, VISIBILITY_DELAY } from '~config/constants';
import { useTimeout } from '~hooks/useTimeout';
import { useState } from 'react';

export const CatalogPageSkeleton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useTimeout(() => {
    setIsVisible(true);
  }, VISIBILITY_DELAY);

  return (
    isVisible && (
      <>
        <div className="m-2 flex justify-between gap-4">
          <Skeleton className="h-10 w-full max-w-30" />
          <Skeleton className="bg-main h-10 w-full max-w-26" />
        </div>

        <div className="my-4 flex flex-col justify-center gap-8 md:flex-row md:justify-between">
          <div className="flex w-full flex-2 gap-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="bg-main h-10 w-15" />
            <Skeleton className="bg-main h-10 w-15" />
          </div>
          <Skeleton className="bg-main flex h-10 min-h-10 w-full flex-1" />
        </div>

        <div className="grid flex-col gap-4 lg:grid-cols-[minmax(230px,_250px)_1fr]">
          <Skeleton className="flex h-90 flex-col items-center gap-8" />
          <div className="flex flex-col items-center gap-8">
            <ul className="grid w-fit grid-cols-1 justify-center justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <Skeleton key={index} className="h-144 w-75 justify-self-center rounded-lg" />
              ))}
            </ul>
            <Skeleton className="bg-main my-6 h-12 w-full max-w-sm" />
          </div>
        </div>
      </>
    )
  );
};
