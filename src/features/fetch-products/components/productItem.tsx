import type { ProductProjection } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~components/ui/card';
import { ImgElement } from '~components/ui/product-elements/imgElement';
import { PriceElement } from '~components/ui/product-elements/priceElement';
import { navigationRoutes } from '~config/navigation';
import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import { withDataTestId } from '~utils/helpers';
import { Link } from 'react-router';

type ProductItemProps = {
  product: ProductProjection;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <li
      key={product.slug[DEFAULT_STORE_LANGUAGE]}
      {...withDataTestId(product.slug[DEFAULT_STORE_LANGUAGE])}
      className="flex max-w-[300px] flex-col justify-center gap-6"
    >
      <Link
        to={`${navigationRoutes.catalog.path}/${product.slug[DEFAULT_STORE_LANGUAGE]}`}
        className="rounded-lg transition-all hover:scale-[1.01] hover:shadow-sm"
      >
        <Card className="gap-2 py-2.5">
          <CardContent className="flex flex-col gap-1 px-2.5">
            <ImgElement imageUrl={product.masterVariant.images?.[0]?.url ?? ''}></ImgElement>
            <CardHeader>
              <CardTitle>{product.name[DEFAULT_STORE_LANGUAGE]}</CardTitle>
            </CardHeader>
            <PriceElement
              originalPrice={product.masterVariant.prices?.[0]?.value.centAmount ?? 0}
              discountedPrice={product.masterVariant.prices?.[1]?.value.centAmount ?? 0}
            />
            <div className="line-clamp-2 pt-2">{product.description?.[DEFAULT_STORE_LANGUAGE] ?? ''}</div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" variant="default" className="w-full">
              Learn more
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </li>
  );
};
