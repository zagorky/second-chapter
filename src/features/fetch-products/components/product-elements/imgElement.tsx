import { cn } from '~lib/utilities';
import { withDataTestId } from '~utils/helpers';

type ImgProps = {
  imageUrl: string;
  caption?: string;
  className?: string;
  alt: string;
  aspectRatio: 'aspect-square' | 'aspect-video' | 'aspect-auto';
};

export const ImgElement = ({ imageUrl, alt, className, caption, aspectRatio }: ImgProps) => {
  if (!imageUrl) {
    return (
      <div
        {...withDataTestId(`${alt}-img`)}
        className={cn(
          `rounded-base border-border bg-secondary-background flex items-center justify-center border-2`,
          aspectRatio,
          className
        )}
      >
        <span className="text-chart-1 text-xl">No image available</span>
      </div>
    );
  }

  return (
    <figure
      {...withDataTestId(`${alt}-img`)}
      className={cn(
        'rounded-base border-border bg-main font-base max-h-[400px] w-full overflow-hidden border-2',
        className
      )}
    >
      <img className={`custom-filter ${aspectRatio} w-full object-cover`} src={imageUrl} alt={alt} />
      {caption && (
        <figcaption className="text-main-foreground border-border line-clamp-3 border-t-2">{caption}</figcaption>
      )}
    </figure>
  );
};
