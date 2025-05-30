'use client';

import type { ProductProjection } from '@commercetools/platform-sdk';

import { Badge } from '~components/ui/badge/badge';
import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardHeader, CardTitle } from '~components/ui/card';
import { AuthorElement } from '~features/fetch-products/components/product-elements/authorElement';
import { BadgeCondition } from '~features/fetch-products/components/product-elements/badgeCondition';
import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import { getEnumAttribute, getStringAttribute } from '~types/utils/attributesGuards';
import { withDataTestId } from '~utils/helpers';
import { useState } from 'react';

import Marquee from '~/components/ui/marquee';
import { Spinner } from '~/components/ui/spinner/spinner';
import { PriceElement } from '~/features/fetch-products/components/product-elements/price-element/priceElement';
import { calculateDiscount } from '~/features/fetch-products/utils/calculateDiscount';

import { ProductCarousel } from './productCarousel';
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
  SHOW_MORE: 'Show more',
  SHOW_LESS: 'Show less',
} as const;

const MIN_DESCRIPTION_LENGTH_FOR_TOGGLE = 200;

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const author = getStringAttribute(product.masterVariant.attributes, 'author');
  const condition = getEnumAttribute(product.masterVariant.attributes, 'condition');
  const identifier = product.slug[DEFAULT_STORE_LANGUAGE];
  const images = product.masterVariant.images ?? [{ url: '' }];
  const discountPercentage = calculateDiscount(product);
  const isDiscounted = discountPercentage > 0;

  const { categoryNames, isLoading: categoriesLoading } = useProductCategories(product.categories);
  const marqueeItems = [`-${String(discountPercentage)}%`];

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
          {isDiscounted && <Marquee items={marqueeItems} />}
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="mb-2 text-3xl leading-tight font-bold" {...withDataTestId(`${identifier}-name`)}>
              {product.name[DEFAULT_STORE_LANGUAGE]}
            </h1>
            <AuthorElement author={author} id={identifier} />
          </div>

          <div className="flex items-center gap-4">
            <PriceElement
              className="relative px-4 py-2 text-xl"
              type="standalone"
              id={identifier}
              originalPrice={product.masterVariant.prices?.[0]?.value.centAmount ?? 0}
              discountedPrice={product.masterVariant.prices?.[0]?.discounted?.value.centAmount ?? 0}
            />
          </div>

          <BadgeCondition
            label={condition.label}
            conditionKey={condition.key}
            id={identifier}
            className="bg-chart-5 flex"
          />

          <div className="text-foreground flex flex-wrap gap-2 text-sm">
            {!categoriesLoading &&
              categoryNames.map((category) => (
                <Badge key={category} variant="neutral">
                  {category}
                </Badge>
              ))}
            {categoriesLoading && <Spinner size="md" className="mx-auto" />}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{PRODUCT_DETAIL_TEXTS.DESCRIPTION}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isDescriptionExpanded ? 'max-h-none' : 'max-h-32'
                  }`}
                >
                  <p className="text-base leading-relaxed" {...withDataTestId(`${identifier}-description`)}>
                    {product.description?.[DEFAULT_STORE_LANGUAGE] ?? PRODUCT_DETAIL_TEXTS.NO_DESCRIPTION}
                  </p>
                </div>
                {product.description?.[DEFAULT_STORE_LANGUAGE] &&
                  product.description[DEFAULT_STORE_LANGUAGE].length > MIN_DESCRIPTION_LENGTH_FOR_TOGGLE && (
                    <div
                      className={`transition-all duration-500 ease-in-out ${
                        isDescriptionExpanded
                          ? ''
                          : 'from-background pointer-events-none absolute right-0 bottom-0 left-0 h-25 bg-gradient-to-t to-transparent'
                      }`}
                    />
                  )}
                {product.description?.[DEFAULT_STORE_LANGUAGE] &&
                  product.description[DEFAULT_STORE_LANGUAGE].length > MIN_DESCRIPTION_LENGTH_FOR_TOGGLE && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsDescriptionExpanded(!isDescriptionExpanded);
                      }}
                      className="text-primary relative z-10 mt-2 h-auto p-0"
                      {...withDataTestId(`${identifier}-description-toggle`)}
                    >
                      {isDescriptionExpanded ? PRODUCT_DETAIL_TEXTS.SHOW_LESS : PRODUCT_DETAIL_TEXTS.SHOW_MORE}
                    </Button>
                  )}
              </div>
            </CardContent>
          </Card>

          <Button size="lg" disabled={true} className="w-full" {...withDataTestId(`${identifier}-add-to-cart`)}>
            {PRODUCT_DETAIL_TEXTS.ADD_TO_CART}
          </Button>
        </div>
      </div>
    </div>
  );
};
