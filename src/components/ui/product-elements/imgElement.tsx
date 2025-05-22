import { cn } from '~/lib/utilities';

type ImgProps = {
  imageUrl: string;
  caption?: string;
  className?: string;
  alt?: string;
};

export const ImgElement = ({ imageUrl, alt, className, caption }: ImgProps) => {
  if (!imageUrl) {
    return (
      <div
        className={cn(
          'rounded-base border-border bg-secondary-background flex aspect-square items-center justify-center border-2',
          className
        )}
      >
        <span className="text-chart-1 text-xl">No image available</span>
      </div>
    );
  }

  return (
    <figure
      className={cn(
        'rounded-base border-border bg-main font-base max-h-[400px] w-full overflow-hidden border-2',
        className
      )}
    >
      <img className="card-img aspect-square w-full object-cover" src={imageUrl} alt={alt} />
      {caption && (
        <figcaption className="text-main-foreground border-border line-clamp-3 border-t-2">{caption}</figcaption>
      )}
    </figure>
  );
};
