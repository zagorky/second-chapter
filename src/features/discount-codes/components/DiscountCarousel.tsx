import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from '~components/carousel/carousel';
import { useDiscountCodes } from '~features/discount-codes/hooks/useDiscountCodes';
import { cn } from '~lib/utilities';

import { Spinner } from '~/components/ui/spinner/spinner';

import { DiscountBanner } from './DiscountBanner';

type DiscountCarouselProps = {
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
};

export const DiscountCarousel = ({ autoplay = true, autoplayDelay = 8000, className }: DiscountCarouselProps) => {
  const { discountCodes, isLongLoading, error } = useDiscountCodes();

  if (isLongLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center">Failed to load discount codes</div>;
  }

  if (!discountCodes || discountCodes.length === 0) {
    return <div className="p-8 text-center">No active discount codes available</div>;
  }

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
          {discountCodes.map((discount) => (
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
