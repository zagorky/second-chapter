import type { ProductProjection } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardTitle } from '~components/ui/card';
import { DEFAULT_STORE_LANGUAGE } from '~config/constants';
import { navigationRoutes } from '~config/navigation';
import { AuthorElement } from '~features/fetch-products/components/product-elements/authorElement';
import { BadgeCondition } from '~features/fetch-products/components/product-elements/badgeCondition';
import { ImgElement } from '~features/fetch-products/components/product-elements/imgElement';
import { PriceElement } from '~features/fetch-products/components/product-elements/price-element/priceElement';
import { getEnumAttribute, getStringAttribute } from '~types/utils/attributesGuards';
import { withDataTestId } from '~utils/helpers';
import { useNavigate } from 'react-router';

import { ProductCartButtons } from '~/features/cart/components/ProductCartButtons';

type ProductItemProps = {
  product: ProductProjection;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  const author = getStringAttribute(product.masterVariant.attributes, 'author');
  const condition = getEnumAttribute(product.masterVariant.attributes, 'condition');
  const identifier = product.slug[DEFAULT_STORE_LANGUAGE];
  const navigate = useNavigate();

  return (
    <li key={identifier} {...withDataTestId(identifier)} className="group flex flex-col gap-2">
      <Card className="relative flex h-full max-w-[300px] flex-col justify-start gap-2 rounded-lg p-2.5 shadow-none transition-all">
        <PriceElement
          className="absolute top-6 left-0 z-1 py-1 pr-4 pl-5"
          id={identifier}
          originalPrice={product.masterVariant.prices?.[0]?.value.centAmount ?? 0}
          discountedPrice={product.masterVariant.prices?.[0]?.discounted?.value.centAmount ?? 0}
        />
        <ImgElement
          imageUrl={product.masterVariant.images?.[0]?.url ?? ''}
          alt={identifier}
          aspectRatio="aspect-square"
        ></ImgElement>
        <CardContent className="flex grow flex-col justify-between gap-3 p-2.5">
          <div className="flex flex-row flex-wrap gap-2 self-start">
            <BadgeCondition
              label={condition.label}
              conditionKey={condition.key}
              id={identifier}
              className="bg-chart-5"
            />
          </div>
          <ProductCartButtons product={product} identifier={identifier} />
          <div>
            <CardTitle className="line-clamp-2 text-lg leading-tight" {...withDataTestId(`${identifier}-name`)}>
              {product.name[DEFAULT_STORE_LANGUAGE]}
            </CardTitle>
            <AuthorElement author={author} id={identifier} />
          </div>
          <div className="line-clamp-2" {...withDataTestId(`${identifier}-description`)}>
            {product.description?.[DEFAULT_STORE_LANGUAGE] ?? ''}
          </div>

          <Button
            onClick={() => void navigate(`${navigationRoutes.product.path}/${identifier}`)}
            variant="ghostGroupHover"
            size="defaultNoPadding"
          >
            Learn more
          </Button>
        </CardContent>
      </Card>
    </li>
  );
};
