import { Button } from '~components/ui/button/button';
import { Link } from 'react-router';

const ProductPage = () => {
  return (
    <div>
      <h1 className={'heading-1'}>Product Page</h1>
      <Button variant="default" className="inline-flex" asChild>
        <Link to=".." relative="path">
          Go back
        </Link>
      </Button>
    </div>
  );
};

export default ProductPage;
