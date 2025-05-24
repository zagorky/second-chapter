import type { ProductProjection } from '@commercetools/platform-sdk';

import { Badge } from '~components/ui/badge/badge';
import { Card, CardContent, CardTitle } from '~components/ui/card';
import { navigationRoutes } from '~config/navigation';
import { AuthorElement } from '~features/fetch-products/components/product-elements/authorElement';
import { ImgElement } from '~features/fetch-products/components/product-elements/imgElement';
import { PriceElement } from '~features/fetch-products/components/product-elements/priceElement';
import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import { getLabelAttribute, getStringAttribute } from '~types/utils/attributesGuards';
import { withDataTestId } from '~utils/helpers';
import { Link } from 'react-router';

type ProductItemProps = {
  product: ProductProjection;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  const author = getStringAttribute(product.masterVariant.attributes, 'author');
  const conditionLabel = getLabelAttribute(product.masterVariant.attributes, 'condition');

  const identifier = product.slug[DEFAULT_STORE_LANGUAGE];

  return (
    <li key={identifier} {...withDataTestId(identifier)} className="contents">
      <Link
        to={`${navigationRoutes.product.path}/${identifier}`}
        className="transition-all hover:scale-[1.01] hover:shadow-sm"
      >
        <Card className="relative flex h-full max-w-[300px] flex-col justify-start gap-2 rounded-lg p-2.5">
          <PriceElement
            className="absolute top-6 left-0 z-1 py-1 pr-4 pl-5"
            id={identifier}
            originalPrice={product.masterVariant.prices?.[0]?.value.centAmount ?? 0}
            discountedPrice={product.masterVariant.prices?.[0]?.discounted?.value.centAmount ?? 0}
          />
          <ImgElement imageUrl={product.masterVariant.images?.[0]?.url ?? ''} alt={identifier}></ImgElement>
          <CardContent className="flex grow flex-col justify-between gap-3 p-2.5">
            <div>
              <CardTitle className="line-clamp-2 text-lg leading-tight" {...withDataTestId(`${identifier}-name`)}>
                {product.name[DEFAULT_STORE_LANGUAGE]}
              </CardTitle>
              <AuthorElement author={author} id={identifier} />
            </div>
            <div className="line-clamp-2" {...withDataTestId(`${identifier}-description`)}>
              {product.description?.[DEFAULT_STORE_LANGUAGE] ?? ''}
            </div>
            <div className="flex flex-row gap-2 self-start">
              {product.masterVariant.prices?.[0]?.discounted && <Badge>Sale</Badge>}
              <Badge className="bg-chart-5" {...withDataTestId(`${identifier}-condition`)}>
                {conditionLabel}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
    </li>
  );
};
