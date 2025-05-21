import { ErrorElement } from '~components/ui/product-elements/errorElement';
import { Spinner } from '~components/ui/spinner/spinner';
import { ProductItem } from '~features/fetch-products/components/productItem';
import { useProductData } from '~features/fetch-products/hooks/useProductData';
import { withDataTestId } from '~utils/helpers';

export const ProductList = () => {
  const { products, error, isLoading, mutate } = useProductData();

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
