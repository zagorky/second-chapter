import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from '~components/carousel/carousel';
import { Card, CardContent } from '~components/ui/card';
import { ImgElement } from '~features/fetch-products/components/product-elements/imgElement';
import { cn } from '~lib/utilities';

import { Dialog, DialogTrigger, DialogContent } from '~/components/ui/dialog/dialog';

const ProductCarouselItem = ({
  image,
  identifier,
  index,
  aspectRatio,
  isInDialog = false,
}: {
  image: { url: string };
  identifier: string;
  index: number;
  aspectRatio: 'aspect-square' | 'aspect-video' | 'aspect-auto';
  isInDialog?: boolean;
}) => (
  <>
    {isInDialog ? (
      <img
        src={image.url}
        alt={`${identifier}-carousel-${String(index)}`}
        className={'rounded-base mx-auto h-full max-h-[80vh] w-auto border-2 object-contain'}
        data-carousel-scale-target
      />
    ) : (
      <Card className="bg-main text-main-foreground p-0 transition-opacity" data-carousel-scale-target>
        <CardContent className={cn('flex', 'h-full items-center justify-center p-2')}>
          <ImgElement
            aspectRatio={aspectRatio}
            imageUrl={image.url}
            alt={`${identifier}-carousel-${String(index)}`}
            className={''}
          />
        </CardContent>
      </Card>
    )}
  </>
);

const ImageDialog = ({
  images,
  identifier,
  initialIndex = 0,
}: {
  images: { url: string }[];
  identifier: string;
  initialIndex?: number;
}) => {
  return (
    <DialogContent size="fullscreen">
      <ProductCarousel
        images={images}
        identifier={`${identifier}-dialog`}
        autoplay={false}
        aspectRatio="aspect-auto"
        initialIndex={initialIndex}
        isInDialog={true}
      />
    </DialogContent>
  );
};

export const ProductCarousel = ({
  images,
  identifier,
  autoplay,
  aspectRatio,
  initialIndex = 0,
  enableDialog = false,
  isInDialog = false,
}: {
  images: { url: string }[];
  identifier: string;
  autoplay: boolean;
  aspectRatio: 'aspect-square' | 'aspect-video' | 'aspect-auto';
  initialIndex?: number;
  enableDialog?: boolean;
  isInDialog?: boolean;
}) => {
  const hasMultipleImages = images.length !== 1;

  return (
    <Carousel
      key={`${identifier}-carousel`}
      className={cn('relative flex flex-col items-stretch gap-4', isInDialog && 'p-4 pt-10')}
      options={{ loop: true, autoplay, startIndex: initialIndex }}
    >
      <div className="flex flex-grow items-center justify-center gap-6 px-2">
        {hasMultipleImages && <CarouselPrevious />}
        <CarouselContent className="w-fit">
          {images.map((image, index) => (
            <CarouselItem key={`${identifier}-carousel-${String(index)}`}>
              <div>
                {enableDialog ? (
                  <Dialog>
                    <DialogTrigger asChild className="cursor-pointer">
                      <div>
                        <ProductCarouselItem
                          image={image}
                          identifier={identifier}
                          index={index}
                          aspectRatio={aspectRatio}
                          isInDialog={isInDialog}
                        />
                      </div>
                    </DialogTrigger>
                    <ImageDialog images={images} identifier={identifier} initialIndex={index} />
                  </Dialog>
                ) : (
                  <ProductCarouselItem
                    image={image}
                    identifier={identifier}
                    index={index}
                    aspectRatio={aspectRatio}
                    isInDialog={isInDialog}
                  />
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {hasMultipleImages && <CarouselNext />}
      </div>

      {hasMultipleImages && <CarouselDots />}
    </Carousel>
  );
};
