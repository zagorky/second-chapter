import type { ProductProjection } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~components/ui/card';
import { ProductImg } from '~components/ui/productElements/productImg';
import { navigationRoutes } from '~config/navigation';
import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import { Link } from 'react-router';

type ProductItemProps = {
  product: ProductProjection;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div key={product.id} className="flex max-w-[300px] flex-col justify-center gap-6">
      <Link
        to={`${navigationRoutes.catalog.path}/${product.id}`}
        className="rounded-lg transition-all hover:scale-[1.01] hover:shadow-sm"
      >
        <Card className="gap-2 py-2.5">
          <CardContent className="flex flex-col gap-1 px-2.5">
            <ProductImg imageUrl={product.masterVariant.images?.[0]?.url ?? ''}></ProductImg>
            <CardHeader>
              <CardTitle>{product.name[DEFAULT_STORE_LANGUAGE]}</CardTitle>
            </CardHeader>
            <div>
              💷 <span className="font-bold">Price</span> &pound;54.00
            </div>

            <div className="line-clamp-2 pt-2">{product.description?.[DEFAULT_STORE_LANGUAGE] ?? ''}</div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={true}>
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </Link>
    </div>
  );
};
