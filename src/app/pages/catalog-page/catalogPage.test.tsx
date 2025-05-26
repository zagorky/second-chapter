import { render, screen } from '@testing-library/react';
import CatalogPage from '~app/pages/catalog-page/catalogPage';
import { mockProducts } from '~features/fetch-products/config/mockProducts';
import { useProductData } from '~features/fetch-products/hooks/useProductData';
import { MemoryRouter } from 'react-router';

vi.mock('~features/fetch-products/hooks/useProductData');
const mockUseProductData = vi.mocked(useProductData);

describe('CatalogPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with a header', () => {
    mockUseProductData.mockReturnValue({
      products: mockProducts,
      error: undefined,
      isLongLoading: false,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('catalog-page-header')).toBeInTheDocument();
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
