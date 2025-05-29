'use client';

import type { ProductProjection } from '@commercetools/platform-sdk';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselDots,
} from '~components/carousel/carousel';
import { Badge } from '~components/ui/badge/badge';
import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '~components/ui/card';
import { AuthorElement } from '~features/fetch-products/components/product-elements/authorElement';
import { BadgeCondition } from '~features/fetch-products/components/product-elements/badgeCondition';
import { ImgElement } from '~features/fetch-products/components/product-elements/imgElement';
import { PriceElement } from '~features/fetch-products/components/product-elements/priceElement';
import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import { cn } from '~lib/utilities';
import { getEnumAttribute, getStringAttribute } from '~types/utils/attributesGuards';
import { withDataTestId } from '~utils/helpers';

import { Dialog, DialogTrigger, DialogContent } from '~/components/ui/dialog/dialog';
import { Spinner } from '~/components/ui/spinner/spinner';

import { useProductCategories } from './useProductCategories';

type ProductDetailProps = {
  product: ProductProjection;
};

const PRODUCT_DETAIL_TEXTS = {
  CONDITION: 'Condition:',
  NO_DESCRIPTION: 'No description available',
  ADD_TO_CART: 'Add to Cart',
  CATEGORY_FIELD_LABEL: 'Categories:',
  SALE: 'Sale',
  DESCRIPTION: 'Description',
} as const;

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

const ProductCarousel = ({
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
      <div className="flex flex-grow items-center justify-center gap-6">
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

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const author = getStringAttribute(product.masterVariant.attributes, 'author');
  const condition = getEnumAttribute(product.masterVariant.attributes, 'condition');
  const identifier = product.slug[DEFAULT_STORE_LANGUAGE];
  const images = product.masterVariant.images ?? [{ url: '' }];

  const { categoryNames, isLoading: categoriesLoading } = useProductCategories(product.categories);

  return (
    <div {...withDataTestId(`${identifier}-detail`)}>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <ProductCarousel
            images={images}
            identifier={identifier}
            autoplay={true}
            aspectRatio="aspect-auto"
            enableDialog={true}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-3xl leading-tight font-bold" {...withDataTestId(`${identifier}-name`)}>
              {product.name[DEFAULT_STORE_LANGUAGE]}
            </h1>
            <AuthorElement author={author} id={identifier} />
          </div>

          <div className="flex items-center gap-4">
            <PriceElement
              className="relative px-4 py-2 text-xl"
              id={identifier}
              originalPrice={product.masterVariant.prices?.[0]?.value.centAmount ?? 0}
              discountedPrice={product.masterVariant.prices?.[0]?.discounted?.value.centAmount ?? 0}
            />
            {product.masterVariant.prices?.[0]?.discounted && (
              <Badge className="bg-destructive text-destructive-foreground">{PRODUCT_DETAIL_TEXTS.SALE}</Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold">{PRODUCT_DETAIL_TEXTS.CONDITION}</span>
            <BadgeCondition
              label={condition.label}
              conditionKey={condition.key}
              id={identifier}
              className="bg-chart-5"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{PRODUCT_DETAIL_TEXTS.DESCRIPTION}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed" {...withDataTestId(`${identifier}-description`)}>
                {product.description?.[DEFAULT_STORE_LANGUAGE] ?? PRODUCT_DETAIL_TEXTS.NO_DESCRIPTION}
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Button size="lg" className="w-full" {...withDataTestId(`${identifier}-add-to-cart`)}>
              {PRODUCT_DETAIL_TEXTS.ADD_TO_CART}
            </Button>

            <div className="text-foreground text-sm">
              {!categoriesLoading && (
                <p>
                  {PRODUCT_DETAIL_TEXTS.CATEGORY_FIELD_LABEL} {categoryNames.join(', ')}
                </p>
              )}
              {categoriesLoading && <Spinner size="md" className="mx-auto" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
