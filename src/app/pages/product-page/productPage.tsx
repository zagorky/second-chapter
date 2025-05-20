import type { ProductProjection } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { Link } from 'react-router';

type ProductPageProps = {
  product: ProductProjection;
};

const ProductPage = ({ product }: ProductPageProps) => {
  return (
    <div>
      <h1 className={'heading-1'}>Product Page</h1>
      {product}
      <Button variant="default" className="inline-flex" asChild>
        <Link to=".." relative="path">
          Go back
        </Link>
      </Button>
    </div>
  );
};

export default ProductPage;
