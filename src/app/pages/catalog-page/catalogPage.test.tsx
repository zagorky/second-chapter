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
    vi.resetAllMocks();
    mockUseFacetsData.mockReturnValue({
      conditions: null,
      price: null,
    });
  });

  it('should render error state when there is an error', () => {
    mockUseProductData.mockReturnValue({
      products: [],
      error: new Error('Test error message'),
      isLongLoading: false,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('data-error-element')).toBeInTheDocument();
  });

  it('should render spinner when loading', async () => {
    mockUseProductData.mockReturnValue({
      products: undefined,
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

    expect(await screen.findByTestId('spinner')).toBeInTheDocument();
  });

  it('should render empty list when no products', async () => {
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

    expect(await screen.findByTestId('empty-list')).toBeInTheDocument();
  });
});
