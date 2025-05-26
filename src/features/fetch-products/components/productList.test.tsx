import type { ProductProjection } from '@commercetools/platform-sdk';

import { render, screen } from '@testing-library/react';
import { ProductList } from '~features/fetch-products/components/productList';
import { DEFAULT_STORE_LANGUAGE } from '~features/fetch-products/config/constants';
import { mockProducts } from '~features/fetch-products/config/mockProducts';
import { MemoryRouter } from 'react-router';

vi.mock('~features/fetch-products/components/productItem', () => ({
  ProductItem: ({ product }: { product: ProductProjection }) => (
    <div data-testid={`product-${product.id}`}>{product.name[DEFAULT_STORE_LANGUAGE]}</div>
  ),
}));

describe('ProductList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render product list when products exist', () => {
    render(
      <MemoryRouter>
        <ProductList products={mockProducts} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('catalog-page-product-list')).toBeInTheDocument();
    expect(screen.getByTestId('product-test-id-1')).toHaveTextContent('Test Product Name');
    expect(screen.getByTestId('product-test-id-2')).toHaveTextContent('Test Product Name-2');
  });
});
