import { render, screen } from '@testing-library/react';
import { ProductItem } from '~features/fetch-products/components/productItem';
import { mockProduct1 } from '~features/fetch-products/config/mockProducts';
import { MemoryRouter } from 'react-router';

describe('ProductItem', () => {
  it('should render card with all correct fields', () => {
    render(
      <MemoryRouter>
        <ProductItem product={mockProduct1} />
      </MemoryRouter>
    );
    const img = screen.getByRole('img');

    expect(screen.getByTestId('test-product-slug')).toBeInTheDocument();
    expect(screen.getByTestId('test-product-slug-img')).toBeInTheDocument();
    expect(screen.getByTestId('test-product-slug-name')).toHaveTextContent('Test Product Name');
    expect(screen.getByTestId('test-product-slug-description')).toHaveTextContent('Test product description');
    expect(screen.getByTestId('test-product-slug-price')).toBeInTheDocument();
    expect(screen.getByText(/£ 10\.00/)).toBeInTheDocument();
    expect(screen.getByText(/£ 8\.00/)).toBeInTheDocument();
    expect(screen.getByTestId('test-product-slug-author')).toHaveTextContent('Test Author');
    expect(screen.getByTestId('test-product-slug-condition')).toHaveTextContent('Like New');
    expect(img).toHaveAttribute('src', 'https://example.com/product-image.jpg');
    expect(img).toHaveAttribute('alt', 'test-product-slug');
  });

  it('should render card with unknown author and condition', () => {
    const productWithoutAttributes = {
      ...mockProduct1,
      masterVariant: {
        ...mockProduct1.masterVariant,
        attributes: undefined,
      },
    };

    render(
      <MemoryRouter>
        <ProductItem product={productWithoutAttributes} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('test-product-slug-condition')).toHaveTextContent('Unknown');
    expect(screen.getByTestId('test-product-slug-author')).toHaveTextContent('Unknown');
  });

  it('should render card with incorrect price when prices are undefined', () => {
    const productWithoutPrices = {
      ...mockProduct1,
      masterVariant: {
        ...mockProduct1.masterVariant,
        prices: undefined,
      },
    };

    render(
      <MemoryRouter>
        <ProductItem product={productWithoutPrices} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('test-product-slug-price')).toBeInTheDocument();
    expect(screen.getByText(/Incorrect Price/)).toBeInTheDocument();
  });
});
