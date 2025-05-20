import type { ProductProjection } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~components/ui/card';
import { ProductImg } from '~components/ui/productElements/productImg';
import { LANGUAGE } from '~features/fetch-products/config/constants';

type ProductItemProps = {
  product: ProductProjection;
};

export const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div key={product.id} className="flex max-w-[300px] flex-col justify-center gap-6">
      <Card>
        <CardContent>
          <ProductImg imageUrl={product.masterVariant.images?.[0]?.url ?? ''}></ProductImg>
          <p>
            <span className="bold">Price</span> 54.00
          </p>
          <CardHeader>
            <CardTitle>{product.name[LANGUAGE]}</CardTitle>
          </CardHeader>
          <div className="line-clamp-3 pt-2">{product.description?.[LANGUAGE] ?? ''}</div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
