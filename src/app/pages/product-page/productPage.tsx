import { DataErrorElement } from '~components/ui/data-error-element/dataErrorElement';
import { Spinner } from '~components/ui/spinner/spinner';
import { useProductByKey } from '~features/fetch-products/hooks/useProductByKey';
import { normalizeError } from '~utils/normalizeError';
import { useParams } from 'react-router';

import { ProductDetail } from '../../../features/fetch-products/components/product-detail/productDetail';

const ProductPage = () => {
  const { key } = useParams<{ key: string }>();

  const { product, error, isLongLoading, refresh } = useProductByKey(key ?? '');

  if (error) return <DataErrorElement errorText={normalizeError(error).message} retryAction={refresh} />;

  if (isLongLoading)
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spinner size="xl" />
      </div>
    );

  return (
    <div className="flex flex-grow items-center justify-center">{product && <ProductDetail product={product} />}</div>
  );
};

export default ProductPage;
