'use client';

import type { ProductProjection } from '@commercetools/platform-sdk';

import { Badge } from '~components/ui/badge/badge';
import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '~components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~components/ui/carousel';
import { AuthorElement } from '~features/fetch-products/components/product-elements/authorElement';
import { BadgeCondition } from '~features/fetch-products/components/product-elements/badgeCondition';
import { ImgElement } from '~features/fetch-products/components/product-elements/imgElement';
import { PriceElement } from '~features/fetch-products/components/product-elements/priceElement';
import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import { fetchCategories } from '~features/fetch-products/utils/fetchCategories';
import { getEnumAttribute, getStringAttribute } from '~types/utils/attributesGuards';
import { withDataTestId } from '~utils/helpers';
import { useEffect, useState } from 'react';

import { Spinner } from '~/components/ui/spinner/spinner';

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

const ERRORS = {
  FETCH_CATEGORIES: 'Failed to fetch categories',
} as const;

const useProductCategories = (productCategories: { id: string }[]) => {
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setIsLoading(true);
        const categories = await fetchCategories();
        const productCategoriesId = new Set(productCategories.map((category) => category.id));

        const names = categories
          .filter((category) => productCategoriesId.has(category.id))
          .sort((a, b) => Number(b.orderHint) - Number(a.orderHint))
          .map((category) => category.name[DEFAULT_STORE_LANGUAGE]);

        setCategoryNames(names);
      } catch (error) {
        console.error(ERRORS.FETCH_CATEGORIES, error);
        setCategoryNames([]);
      } finally {
        setIsLoading(false);
      }
    };

    void getCategories();
  }, [productCategories]);

  return { categoryNames, isLoading };
};

const renderImageCarousel = (images: { url: string }[], identifier: string) => (
  <div className="flex w-full flex-col items-center gap-4">
    <Carousel className="w-full max-w-[500px]">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={`${identifier}-carousel-${String(index)}`}>
            <div className="p-[10px]">
              <Card className="bg-main text-main-foreground p-0 shadow-none">
                <CardContent className="flex aspect-square items-center justify-center p-4">
                  <ImgElement imageUrl={image.url} alt={`${identifier}-carousel-${String(index)}`} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
);

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const author = getStringAttribute(product.masterVariant.attributes, 'author');
  const condition = getEnumAttribute(product.masterVariant.attributes, 'condition');
  const identifier = product.slug[DEFAULT_STORE_LANGUAGE];
  const images = product.masterVariant.images ?? [];

  const { categoryNames, isLoading: categoriesLoading } = useProductCategories(product.categories);

  return (
    <div className="mx-auto max-w-6xl p-4" {...withDataTestId(`${identifier}-detail`)}>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          {/* {images.length > 1 && (
          )} */}

          {renderImageCarousel(images, identifier)}
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
              {product.categories.length > 0 && !categoriesLoading && (
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
