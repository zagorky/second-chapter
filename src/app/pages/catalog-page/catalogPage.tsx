import { ProductList } from '~features/fetch-products/components/productList';

const CatalogPage = () => {
  return (
    <>
      <h1 className={'heading-1'}>Catalog</h1>
      <ProductList />
    </>
  );
};

export default CatalogPage;
