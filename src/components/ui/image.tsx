import { cn } from '~/lib/utilities';

type ImageProps = {
  src: string;
  alt: string;
  size: number;
  className?: string;
};

export const Image = ({ src, alt, size, className }: ImageProps) => {
  return (
    <figure
      className={cn('mx-auto overflow-hidden', className)}
      style={{ height: `${size.toString()}px`, width: `${size.toString()}px` }}
    >
      <img className="w-full object-contain" src={src} alt={alt} />
    </figure>
  );
};
