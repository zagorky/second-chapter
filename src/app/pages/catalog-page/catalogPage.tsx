import { CategoriesBar } from '~features/categories/components/categoriesBar';
import { ProductList } from '~features/fetch-products/components/productList';
import { SearchBar } from '~features/search/components/searchBar';
import { SortBar } from '~features/sort/components/sortBar';
import { withDataTestId } from '~utils/helpers';

const CatalogPage = () => {
  return (
    <>
      <h1 className={'heading-1'} {...withDataTestId('catalog-page-header')}>
        Catalog
      </h1>
      <div className="flex flex-col gap-4">
        <div className="flex-1">
          <CategoriesBar />
        </div>
        <div className="flex-3">
          <div className="m-2 flex flex-1 flex-col justify-center gap-4 px-6 py-3 md:flex-row md:justify-between">
            <SearchBar />
            <SortBar />
          </div>
          <ProductList />
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
