import type { ProductProjection } from '@commercetools/platform-sdk';

import { ErrorElement } from '~components/ui/product-elements/errorElement';
import { Spinner } from '~components/ui/spinner/spinner';
import { ProductItem } from '~features/fetch-products/components/productItem';
import { CACHE_KEY } from '~features/fetch-products/config/constants';
import { fetchProducts } from '~features/fetch-products/utils/fetchProducts';
import { withDataTestId } from '~utils/helpers';
import useSWR from 'swr';

export const ProductList = () => {
  const { data: products, error, isLoading, mutate } = useSWR<ProductProjection[], Error>(CACHE_KEY, fetchProducts);

  if (error) return <ErrorElement error={error} retryAction={() => void mutate()} />;
  if (isLoading && !products) return <Spinner />;

  return (
    <ul
      className="grid grid-cols-1 place-items-center gap-2 md:grid-cols-2 lg:grid-cols-3"
      {...withDataTestId('catalog-page-product-list')}
    >
      {products?.map((product) => {
        return <ProductItem product={product} key={product.id} />;
      })}
    </ul>
  );
};
