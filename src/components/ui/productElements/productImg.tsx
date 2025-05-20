import { cn } from '~/lib/utilities';

type Props = {
  imageUrl: string;
  caption?: string;
  className?: string;
  alt?: string;
};

export const ProductImg = ({ imageUrl, alt, className, caption }: Props) => {
  return (
    <figure
      className={cn(
        'rounded-base border-border bg-main font-base max-h-[400px] w-full overflow-hidden border-2',
        className
      )}
    >
      <img className="aspect-[9/10] w-full object-cover" src={imageUrl} alt={alt} />
      {caption && (
        <figcaption className="text-main-foreground border-border line-clamp-3 border-t-2">{caption}</figcaption>
      )}
    </figure>
  );
};
