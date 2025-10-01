import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

import { cn } from '~/lib/utilities';

type AnimatedWordProps = {
  words: string[];
  className?: string;
  interval?: number;
};

export const AnimatedWord = ({ words, className, interval = 3000 }: AnimatedWordProps) => {
  const [emblaReference] = useEmblaCarousel(
    {
      axis: 'y',
      loop: true,
      align: 'start',
      containScroll: 'trimSnaps',
    },
    [Autoplay({ delay: interval, stopOnInteraction: false })]
  );

  return (
    <div className={cn('relative inline-block h-[1.2em] overflow-hidden', className)}>
      <div ref={emblaReference} className="h-full overflow-hidden">
        <div className="flex h-full flex-col">
          {words.map((word, index) => (
            <div
              key={`${word}-${String(index)}`}
              className="from-chart-1 via-chart-2 to-chart-3 flex h-[1.2em] min-h-[1.2em] flex-shrink-0 items-center bg-gradient-to-r bg-clip-text text-transparent"
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
