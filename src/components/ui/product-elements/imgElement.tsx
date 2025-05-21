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
          'rounded-base border-border flex aspect-[9/10] items-center justify-center border-2 bg-gray-200',
          className
        )}
      >
        <span className="text-xl text-pink-600">No image available</span>
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
      <img className="card-img aspect-[9/10] w-full object-cover" src={imageUrl} alt={alt} />
      {caption && (
        <figcaption className="text-main-foreground border-border line-clamp-3 border-t-2">{caption}</figcaption>
      )}
    </figure>
  );
};
