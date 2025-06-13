import { cva } from 'class-variance-authority';

import { cn } from '~/lib/utilities';

type ImageProps = {
  src: string;
  alt: string;
  size: number;
  className?: string;
  width?: number;
  height?: number;
  borders?: 'noBorders' | 'base';
};

const imageVariants = cva('mx-auto overflow-hidden', {
  variants: {
    borders: {
      noBorders: '',
      base: 'border-2 border-border rounded-base',
    },
  },
  defaultVariants: {
    borders: 'noBorders',
  },
});

export const Image = ({ src, alt, size, className, width, height, borders }: ImageProps) => {
  return (
    <figure
      className={cn(imageVariants({ borders }), className)}
      style={{ height: `${size.toString()}px`, width: `${size.toString()}px` }}
    >
      <img className="w-full object-contain" src={src} alt={alt} width={width} height={height} />
    </figure>
  );
};
