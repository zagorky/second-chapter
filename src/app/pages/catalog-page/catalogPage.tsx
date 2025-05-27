import { DataErrorElement } from '~components/ui/data-error-element/dataErrorElement';
import { Spinner } from '~components/ui/spinner/spinner';
import { EmptyList } from '~features/fetch-products/components/emptyList';
import { ProductList } from '~features/fetch-products/components/productList';
import { useProductData } from '~features/fetch-products/hooks/useProductData';
import { FilterBar } from '~features/filters/components/filterBar';
import { buildFilterQueryParameters } from '~features/filters/utils/buildFilterQueryParameters';
import { SearchBar } from '~features/search/components/searchBar';
import { buildSearchQueryParameters } from '~features/search/utils/buildSearchQueryParameters';
import { SortBar } from '~features/sort/components/sortBar';
import { buildSortQueryParameters } from '~features/sort/utils/buildSortQueryParameters';
import { withDataTestId } from '~utils/helpers';
import { normalizeError } from '~utils/normalizeError';
import { useSearchParams } from 'react-router';

const CatalogPage = () => {
  const [searchParameters] = useSearchParams();
  const sortData = buildSortQueryParameters(searchParameters.get('sort') ?? '');
  const searchData = buildSearchQueryParameters(searchParameters.get('search') ?? '');
  const filterData = buildFilterQueryParameters(
    searchParameters.get('subcategory') ?? '',
    searchParameters.get('category') ?? '',
    searchParameters.get('conditions') ?? '',
    searchParameters.get('sale') ?? '',
    searchParameters.get('price') ?? ''
  );
  const { products, error, isLongLoading, isLoading, refresh } = useProductData({
    ...sortData,
    ...searchData,
    ...filterData,
  });

  if (error) return <DataErrorElement errorText={normalizeError(error).message} retryAction={refresh} />;
  if (isLongLoading || products === undefined) return <Spinner className="m-auto" size="xl" />;
  if (!isLoading && products.length === 0) return <EmptyList />;

  return (
    <>
      <h1 className={'heading-1'} {...withDataTestId('catalog-page-header')}>
        Catalog
      </h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="w-1/5">
          <FilterBar products={products} />
        </div>
        <div className="w-4/5">
          <div className="m-2 flex flex-1 flex-col justify-center gap-4 px-6 py-3 md:flex-row md:justify-between">
            <SearchBar />
            <SortBar />
          </div>
          <ProductList products={products} />
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
