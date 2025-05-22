import { ProductList } from '~features/fetch-products/components/productList';
import { withDataTestId } from '~utils/helpers';

const CatalogPage = () => {
  return (
    <>
      <h1 className={'heading-1'} {...withDataTestId('catalog-page-header')}>
        Catalog
      </h1>
      <ProductList />
    </>
  );
};

export default CatalogPage;
