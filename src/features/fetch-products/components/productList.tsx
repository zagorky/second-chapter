import { DataErrorElement } from '~components/ui/data-error-element/dataErrorElement';
import { Spinner } from '~components/ui/spinner/spinner';
import { EmptyList } from '~features/fetch-products/components/emptyList';
import { ProductItem } from '~features/fetch-products/components/productItem';
import { useProductData } from '~features/fetch-products/hooks/useProductData';
import { withDataTestId } from '~utils/helpers';
import { normalizeError } from '~utils/normalizeError';

export const ProductList = () => {
  const { products, error, isLongLoading, isLoading, refresh } = useProductData();

  if (error) return <DataErrorElement errorText={normalizeError(error).message} retryAction={refresh} />;
  if (isLongLoading) return <Spinner className="m-auto" size="xl" />;
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
