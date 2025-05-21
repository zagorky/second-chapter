import { render, screen, waitFor } from '@testing-library/react';
import CatalogPage from '~app/pages/catalog-page/catalogPage';
import { MemoryRouter } from 'react-router';

vi.mock('~features/fetch-products/utils/fetchProducts', () => ({
  fetchProducts: vi.fn().mockResolvedValue([
    {
      id: 'test-id-1',
      name: {
        'en-GB': 'Test Product Name',
      },
      slug: {
        'en-GB': 'test-product-slug',
      },
      description: {
        'en-GB': 'Test product description',
      },
      masterVariant: {
        id: 1,
        images: [
          {
            url: 'https://example.com/product-image.jpg',
            label: 'Main product image',
          },
        ],
        prices: [
          {
            value: {
              centAmount: 1000,
              currencyCode: 'GBP',
            },
          },
        ],
        attributes: [],
      },
      variants: [],
    },
  ]),
}));

describe('CatalogPage', () => {
  it('should render with a header and a list of products list with product item', async () => {
    render(
      <MemoryRouter>
        <CatalogPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('catalog-page-header')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId('catalog-page-product-list')).toBeInTheDocument();
    });
    expect(screen.getByTestId('test-product-slug')).toBeInTheDocument();
    expect(screen.getByText('Test Product Name')).toBeInTheDocument();
    expect(screen.getByText('Test product description')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
  });
});
