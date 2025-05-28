import { DataErrorElement } from '~components/ui/data-error-element/dataErrorElement';
import { Spinner } from '~components/ui/spinner/spinner';
import { buildCategoryQueryParameters } from '~features/category/utils/buildCategoryQueryParameters';
import { EmptyList } from '~features/fetch-products/components/emptyList';
import { ProductList } from '~features/fetch-products/components/productList';
import { useProductData } from '~features/fetch-products/hooks/useProductData';
import { FilterBar } from '~features/filters/components/filterBar';
import { useFacetsData } from '~features/filters/hooks/useFacetsData';
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
    searchParameters.get('conditions') ?? '',
    searchParameters.get('sale') ?? '',
    searchParameters.get('price') ?? ''
  );
  const categoryData = buildCategoryQueryParameters(
    searchParameters.get('subcategory') ?? '',
    searchParameters.get('category') ?? ''
  );

  const { conditions, sale, price, facetsError } = useFacetsData();
  const { products, error, isLongLoading, isLoading, refresh } = useProductData({
    ...sortData,
    ...searchData,
    ...filterData,
    ...categoryData,
  });

  return (
    <>
      <h1 className={'heading-1'} {...withDataTestId('catalog-page-header')}>
        Catalog
      </h1>
      <div className="my-4 flex flex-1 flex-col justify-center gap-4 md:flex-row md:justify-between">
        <SearchBar />
        <SortBar />
      </div>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="w-full lg:w-1/5">
          {sale && conditions && price && <FilterBar sale={sale} conditions={conditions} price={price} />}
        </div>
        {facetsError || error ? (
          <DataErrorElement errorText={normalizeError(error).message} retryAction={refresh} />
        ) : isLongLoading || products === undefined ? (
          <Spinner className="m-auto" size="xl" />
        ) : !isLoading && products.length === 0 ? (
          <EmptyList />
        ) : (
          <ProductList products={products} />
        )}
      </div>
    </>
  );
};

export default CatalogPage;
