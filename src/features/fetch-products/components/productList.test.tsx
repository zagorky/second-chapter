import type { ProductProjection } from '@commercetools/platform-sdk';

import { render, screen } from '@testing-library/react';
import { ProductList } from '~features/fetch-products/components/productList';
import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import { mockProducts } from '~features/fetch-products/config/mockProducts';
import { useProductData } from '~features/fetch-products/hooks/useProductData';

vi.mock('~features/fetch-products/hooks/useProductData');
vi.mock('~features/fetch-products/components/emptyList', () => ({
  EmptyList: () => <div data-testid="empty-list">Popique</div>,
}));

vi.mock('~features/fetch-products/components/productItem', () => ({
  ProductItem: ({ product }: { product: ProductProjection }) => (
    <div data-testid={`product-${product.id}`}>{product.name[DEFAULT_STORE_LANGUAGE]}</div>
  ),
}));

const mockUseProductData = vi.mocked(useProductData);

describe('ProductList', () => {
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

    render(<ProductList />);

    expect(screen.getByTestId('data-error-element')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty-list')).not.toBeInTheDocument();
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

    render(<ProductList />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('data-error-element')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty-list')).not.toBeInTheDocument();
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

    render(<ProductList />);

    expect(screen.getByTestId('empty-list')).toBeInTheDocument();
    expect(screen.queryByTestId('data-error-element')).not.toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('catalog-page-product-list')).not.toBeInTheDocument();
  });

  it('should render product list when products exist', () => {
    mockUseProductData.mockReturnValue({
      products: mockProducts,
      error: undefined,
      isLongLoading: false,
      isLoading: false,
      refresh: vi.fn(),
    });

    render(<ProductList />);

    expect(screen.getByTestId('catalog-page-product-list')).toBeInTheDocument();
    expect(screen.getByTestId('product-test-id-1')).toHaveTextContent('Test Product Name');
    expect(screen.getByTestId('product-test-id-2')).toHaveTextContent('Test Product Name-2');
    expect(screen.queryByTestId('data-error-element')).not.toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.queryByTestId('empty-list')).not.toBeInTheDocument();
  });
});
