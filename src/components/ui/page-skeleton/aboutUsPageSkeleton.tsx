import { Skeleton } from '~components/ui/skeleton';

export const AboutUsPageSkeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="m-auto mb-12 h-10 w-full max-w-xl" />
      <Skeleton className="mb-30 h-70 w-full max-w-7xl" />

      <div className="mb-30 flex flex-col items-center gap-6">
        <Skeleton className="h-45 w-full max-w-2xl" />
        <Skeleton className="h-45 w-full max-w-5xl" />
        <Skeleton className="h-45 w-full max-w-5xl" />
      </div>

      <Skeleton className="mb-2 h-110 w-full max-w-7xl" />
    </div>
  );
};
