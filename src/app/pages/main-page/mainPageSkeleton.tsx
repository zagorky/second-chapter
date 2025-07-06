import { Skeleton } from '~components/ui/skeleton';
import { useSkeletonVisibility } from '~hooks/useSkeletonVisibility';

export const MainPageSkeleton = () => {
  const isVisible = useSkeletonVisibility();

  return (
    isVisible && (
      <div className="space-y-12">
        <section className="relative flex flex-col-reverse gap-1 bg-contain bg-right bg-no-repeat px-6 text-left lg:grid lg:grid-cols-[2fr_1fr] lg:py-6">
          <div className="space-y-6">
            <div className="space-y-4 text-left">
              <Skeleton className="h-28 w-full max-w-xl" />
              <Skeleton className="h-14 w-full max-w-sm" />
            </div>
            <Skeleton className="h-16 w-full max-w-50" />
            <Skeleton className="bg-main h-12 w-40" />
          </div>

          <div className="relative flex max-w-[200px] flex-col items-end pt-[50px] sm:max-w-[300px] sm:pt-[100px]">
            <Skeleton className="aspect-[1/1] w-full rounded-lg" />
          </div>
        </section>

        <div className="space-y-4">
          <Skeleton className="mx-auto h-76 w-full max-w-7xl" />
          <div className="flex justify-center gap-2"></div>
        </div>
      </div>
    )
  );
};
