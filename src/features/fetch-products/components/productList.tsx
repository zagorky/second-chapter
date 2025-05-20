import type { ProductProjection } from '@commercetools/platform-sdk';

import { Spinner } from '~components/ui/spinner/spinner';
import { ProductItem } from '~features/fetch-products/components/productItem';
import { CACHE_KEY } from '~features/fetch-products/config/constants';
import { fetchProducts } from '~features/fetch-products/utils/fetchProducts';
import useSWR from 'swr';

export const ProductList = () => {
  const { data: products, error, isLoading } = useSWR<ProductProjection[], Error>(CACHE_KEY, fetchProducts);

  if (error) return <div>Something went wrong...</div>;
  if (isLoading) return <Spinner />;

  return (
    <div className="">
      {products?.map((product) => {
        return <ProductItem product={product} key={product.id} />;
      })}
    </div>
  );
};
