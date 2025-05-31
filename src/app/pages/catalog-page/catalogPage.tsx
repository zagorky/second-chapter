import { DataErrorElement } from '~components/ui/data-error-element/dataErrorElement';
import { Spinner } from '~components/ui/spinner/spinner';
import { Breadcrumbs } from '~features/breadcrumbs/components/breadcrumbs';
import { CategoryMenu } from '~features/category/components/categoryMenu';
import { EmptyList } from '~features/fetch-products/components/emptyList';
import { ProductList } from '~features/fetch-products/components/productList';
import { useProductData } from '~features/fetch-products/hooks/useProductData';
import { buildRequest } from '~features/fetch-products/utils/buildRequest';
import { FilterBar } from '~features/filters/components/filterBar';
import { useFacetsData } from '~features/filters/hooks/useFacetsData';
import { SearchBar } from '~features/search/components/searchBar';
import { SortBar } from '~features/sort/components/sortBar';
import { withDataTestId } from '~utils/helpers';
import { normalizeError } from '~utils/normalizeError';
import { useSearchParams } from 'react-router';

const CatalogPage = () => {
  const [searchParameters] = useSearchParams();
  const { conditions, sale, price } = useFacetsData();
  const { products, error, isLongLoading, isLoading, refresh } = useProductData(buildRequest(searchParameters));
  const renderContent = () => {
    if (error) {
      return <DataErrorElement errorText={normalizeError(error).message} retryAction={refresh} />;
    }

    if (isLongLoading || products === undefined) {
      return <Spinner className="m-auto" size="xl" />;
    }

    if (!isLoading && products.length === 0) {
      return <EmptyList />;
    }

    return <ProductList products={products} />;
  };

  return (
    <>
      <div className="m-2 flex justify-between gap-4">
        <Breadcrumbs />
        <CategoryMenu />
      </div>
      <h1 className={'heading-1 sr-only'} {...withDataTestId('catalog-page-header')}>
        Catalog
      </h1>
      <div className="my-4 flex flex-col justify-center gap-8 md:flex-row md:justify-between">
        <SearchBar />
        <SortBar />
      </div>
      <div className="grid flex-col gap-4 lg:grid-cols-[minmax(230px,_250px)_1fr]">
        {sale && conditions && price && <FilterBar sale={sale} conditions={conditions} price={price} />}
        {renderContent()}
      </div>
    </>
  );
};

export default CatalogPage;
