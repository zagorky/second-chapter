import { Skeleton } from '~components/ui/skeleton';
import { useSkeletonVisibility } from '~hooks/useSkeletonVisibility';

export const ProfilePageSkeleton = () => {
  const isVisible = useSkeletonVisibility();

  return (
    isVisible && (
      <>
        <Skeleton className="rounded-base border-border bg-background grid h-12 w-full grid-cols-2 items-center justify-center gap-1 border-2 p-1">
          <Skeleton className="bg-main h-8 w-full" data-slot="tabs-trigger" />
          <Skeleton className="h-8 w-full border-none bg-inherit" data-slot="tabs-trigger" />
        </Skeleton>

        <div className="mt-2" data-slot="tabs-content">
          <div className="flex flex-col gap-6">
            <Skeleton className="from-chart-1 via-chart-1 to-chart-2 relative-wrapper rounded-base border-border h-[200px] border-2 bg-gradient-to-r">
              <div className="absolute-wrapper flex items-end justify-between p-6">
                <div className="bg-background h-38 w-38 rounded-full border-2" />
              </div>
            </Skeleton>

            <div className="grid min-h-150 grid-cols-1 gap-6 md:grid-cols-2">
              <Skeleton className="rounded-base border-border bg-background border-2"></Skeleton>
              <Skeleton className="rounded-base border-border bg-background border-2"></Skeleton>
            </div>
          </div>
        </div>
      </>
    )
  );
};
