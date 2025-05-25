import type { ProductProjection } from '@commercetools/platform-sdk';

import { EmptyList } from '~features/fetch-products/components/emptyList';
import { ProductItem } from '~features/fetch-products/components/productItem';
import { withDataTestId } from '~utils/helpers';

type ProductListProps = {
  products: ProductProjection[] | null | undefined;
  isLoading: boolean;
};

export const ProductList = ({ products, isLoading }: ProductListProps) => {
  if (!isLoading && products && products.length === 0) return <EmptyList />;

  return (
    <>
      <ul
        className="m-2 mx-auto grid w-fit grid-cols-1 justify-center justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3"
        {...withDataTestId('catalog-page-product-list')}
      >
        {products?.map((product) => {
          return <ProductItem product={product} key={product.id} />;
        })}
      </ul>
    </>
  );
};
