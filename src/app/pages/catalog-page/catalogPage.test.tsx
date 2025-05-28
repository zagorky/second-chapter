import { render, screen } from '@testing-library/react';
import CatalogPage from '~app/pages/catalog-page/catalogPage';
import { useProductData } from '~features/fetch-products/hooks/useProductData';
import { useFacetsData } from '~features/filters/hooks/useFacetsData';
import { MemoryRouter } from 'react-router';

vi.mock('~features/fetch-products/hooks/useProductData');
const mockUseProductData = vi.mocked(useProductData);

vi.mock('~features/filters/hooks/useFacetsData');
const mockUseFacetsData = vi.mocked(useFacetsData);

describe('CatalogPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render error state when there is an error', () => {
    const testError = new Error('Test error message');

    mockUseProductData.mockReturnValue({
      products: [],
      error: testError,
      isLongLoading: false,
      isLoading: false,
      refresh: vi.fn(),
    });
    mockUseFacetsData.mockReturnValue({
      sale: null,
      conditions: null,
      price: null,
      categories: null,
      facetsError: testError,
    });

    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('empty-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('data-error-element')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('catalog-page-product-list')).not.toBeInTheDocument();
  });

  it('should render spinner when loading', () => {
    mockUseProductData.mockReturnValue({
      products: [],
      error: undefined,
      isLongLoading: true,
      isLoading: true,
      refresh: vi.fn(),
    });
    mockUseFacetsData.mockReturnValue({
      sale: null,
      conditions: null,
      price: null,
      categories: null,
      facetsError: undefined,
    });
    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('empty-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('data-error-element')).not.toBeInTheDocument();
    expect(screen.queryByTestId('catalog-page-product-list')).not.toBeInTheDocument();
  });

  it('should render empty list when no products', () => {
    mockUseProductData.mockReturnValue({
      products: [],
      error: undefined,
      isLongLoading: false,
      isLoading: false,
      refresh: vi.fn(),
    });
    mockUseFacetsData.mockReturnValue({
      sale: {
        type: 'terms',
        terms: [{ term: 'new', count: 10 }],
        missing: 0,
        total: 10,
        other: 0,
        dataType: 'number',
      },
      conditions: {
        type: 'terms',
        terms: [{ term: 'new', count: 10 }],
        missing: 0,
        total: 10,
        other: 0,
        dataType: 'number',
      },
      price: {
        type: 'terms',
        terms: [{ term: 'new', count: 10 }],
        missing: 0,
        total: 10,
        other: 0,
        dataType: 'number',
      },
      categories: {
        type: 'terms',
        terms: [{ term: 'new', count: 10 }],
        missing: 0,
        total: 10,
        other: 0,
        dataType: 'number',
      },
      facetsError: undefined,
    });

    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('empty-list')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('data-error-element')).not.toBeInTheDocument();
    expect(screen.queryByTestId('catalog-page-product-list')).not.toBeInTheDocument();
  });
});
