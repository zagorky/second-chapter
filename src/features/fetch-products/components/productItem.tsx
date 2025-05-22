import type { ProductProjection } from '@commercetools/platform-sdk';

import { Badge } from '~components/ui/badge/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~components/ui/card';
import { navigationRoutes } from '~config/navigation';
import { AuthorElement } from '~features/fetch-products/components/product-elements/authorElement';
import { ImgElement } from '~features/fetch-products/components/product-elements/imgElement';
import { PriceElement } from '~features/fetch-products/components/product-elements/priceElement';
import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import { isLabelAttribute, isStringAttribute } from '~types/utils/attributesGuards';
import { withDataTestId } from '~utils/helpers';
import { Link } from 'react-router';

type ProductItemProps = {
  product: ProductProjection;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  const author = isStringAttribute(product.masterVariant.attributes?.[0])
    ? product.masterVariant.attributes[0]?.value
    : 'Unknown';

  const conditionLabel = isLabelAttribute(product.masterVariant.attributes?.[1])
    ? product.masterVariant.attributes[1].value.label
    : 'Unknown';

  const identifier = product.slug[DEFAULT_STORE_LANGUAGE];

  return (
    <li key={identifier} {...withDataTestId(identifier)} className="flex max-w-[300px] flex-col justify-center gap-6">
      <Link
        to={`${navigationRoutes.catalog.path}/${identifier}`}
        className="rounded-lg transition-all hover:scale-[1.01] hover:shadow-sm"
      >
        <Card className="gap-2 py-2.5">
          <CardContent className="flex flex-col gap-1 px-2.5">
            <ImgElement imageUrl={product.masterVariant.images?.[0]?.url ?? ''} alt={identifier}></ImgElement>
            <CardHeader>
              <CardTitle className="h-6" {...withDataTestId(`${identifier}-name`)}>
                {product.name[DEFAULT_STORE_LANGUAGE]}
              </CardTitle>
            </CardHeader>
            <PriceElement
              id={identifier}
              originalPrice={product.masterVariant.prices?.[0]?.value.centAmount ?? 0}
              discountedPrice={product.masterVariant.prices?.[0]?.discounted?.value.centAmount ?? 0}
            />
            <AuthorElement author={author} id={identifier} />
            <div className="line-clamp-2 pt-2" {...withDataTestId(`${identifier}-description`)}>
              {product.description?.[DEFAULT_STORE_LANGUAGE] ?? ''}
            </div>
          </CardContent>
          <CardFooter className="flex-row gap-2">
            {product.masterVariant.prices?.[0]?.discounted && <Badge>Sale</Badge>}
            <Badge className="bg-chart-5" {...withDataTestId(`${identifier}-condition`)}>
              {conditionLabel}
            </Badge>
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
};
