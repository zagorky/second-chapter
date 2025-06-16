import type { DiscountCodeConfig } from '~features/discount-codes/types/DiscountCodeConfig';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from '~components/carousel/carousel';
import { cn } from '~lib/utilities';

import { DiscountBanner } from './DiscountBanner';

type DiscountCarouselProps = {
  discounts: DiscountCodeConfig[];
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
};

export const DiscountCarousel = ({
  discounts,
  autoplay = true,
  autoplayDelay = 8000,
  className,
}: DiscountCarouselProps) => {
  return (
    <Carousel
      className={cn('relative flex flex-col items-stretch gap-4', className)}
      options={{
        loop: true,
        autoplay: autoplay ? { delay: autoplayDelay, stopOnInteraction: false } : false,
        align: 'center',
        slidesToScroll: 1,
      }}
    >
      <div className="flex flex-grow items-center justify-center gap-6 px-2">
        <CarouselPrevious className="hidden sm:block" />
        <CarouselContent className="w-full">
          {discounts.map((discount) => (
            <CarouselItem key={discount.id} className="basis-full">
              <div className="p-2">
                <DiscountBanner discount={discount} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="hidden sm:block" />
      </div>
      <CarouselDots />
    </Carousel>
  );
};
