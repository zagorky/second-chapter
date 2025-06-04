import type { ProductProjection } from '@commercetools/platform-sdk';

import { ProductItem } from '~features/fetch-products/components/productItem';
import { withDataTestId } from '~utils/helpers';

type ProductListProps = {
  products: ProductProjection[];
};

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <>
      <ul
        className="mx-auto grid w-fit grid-cols-1 justify-center justify-items-center gap-8 md:grid-cols-2 xl:grid-cols-3"
        {...withDataTestId('catalog-page-product-list')}
      >
        {products.map((product) => {
          return <ProductItem product={product} key={product.id} />;
        })}
      </ul>
    </>
  );
};
