import { Skeleton } from '~components/ui/skeleton';
import { useSkeletonVisibility } from '~hooks/useSkeletonVisibility';

export const SignupPageSkeleton = () => {
  const isVisible = useSkeletonVisibility();

  return (
    isVisible && (
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-12 w-full max-w-36" />
        <div className="flex w-[calc(100%-32px)] max-w-full flex-col gap-6">
          <Skeleton className="bg-background flex h-[1580px] w-full items-end justify-center md:h-[922px]">
            <Skeleton className="bg-main mx-8 mb-16 h-10 w-full max-w-283" />
          </Skeleton>
        </div>
      </div>
    )
  );
};
