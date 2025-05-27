import { DataErrorElement } from '~components/ui/data-error-element/dataErrorElement';
import { Spinner } from '~components/ui/spinner/spinner';
import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import { useProductData } from '~features/fetch-products/hooks/useProductData';
import { normalizeError } from '~utils/normalizeError';
import { useParams } from 'react-router';

import { ProductDetail } from './productDetail';

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const { products, error, isLongLoading, refresh } = useProductData({
    where: `slug(${DEFAULT_STORE_LANGUAGE}="${String(slug)}")`,
  });

  const product = products?.[0];

  if (error) return <DataErrorElement errorText={normalizeError(error).message} retryAction={refresh} />;

  if (isLongLoading)
    return (
      <div className="flex flex-grow items-center justify-center">
        <Spinner size="xl" className="" />
      </div>
    );

  return (
    <div className="flex flex-grow items-center justify-center">{product && <ProductDetail product={product} />}</div>
  );
};

export default ProductPage;
