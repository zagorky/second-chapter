import { Skeleton } from '~components/ui/skeleton';

export const PageSkeleton = () => {
  return (
    <div className="flex w-full flex-col items-center gap-4 p-4">
      <Skeleton className="h-8 w-3/4 rounded-md sm:w-1/2 md:h-10 md:w-[300px]" />
      <Skeleton className="h-40 w-3/5 rounded-lg sm:w-1/2 md:h-[400px] md:w-[500px]" />
    </div>
  );
};
