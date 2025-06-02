import { cn } from '~/lib/utilities';

type Props = {
  imageUrl: string;
  caption: string;
  className?: string;
};

export default function ImageCard({ imageUrl, caption, className }: Props) {
  return (
    <figure
      className={cn(
        'rounded-base border-border bg-main font-base shadow-shadow w-[250px] overflow-hidden border-2',
        className
      )}
    >
      <img className="aspect-4/3 w-full object-cover" src={imageUrl} alt="description" />
      <figcaption className="text-main-foreground border-border truncate border-t-2 p-4">{caption}</figcaption>
    </figure>
  );
}
