import { Skeleton } from '~components/ui/skeleton';
import { useSkeletonVisibility } from '~hooks/useSkeletonVisibility';

export const ErrorPageSkeleton = () => {
  const isVisible = useSkeletonVisibility();

  return (
    isVisible && (
      <div className="m-auto flex h-[calc(100vh-200px)] w-full max-w-xl flex-col justify-center p-10">
        <div className="flex w-full flex-col gap-4 p-4">
          <Skeleton className="h-60 w-full max-w-xl py-5" />
          <Skeleton className="bg-main m-auto h-10 w-full max-w-30" />
        </div>
      </div>
    )
  );
};
