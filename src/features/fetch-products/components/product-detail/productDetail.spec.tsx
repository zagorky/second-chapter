import type { ProductProjection } from '@commercetools/platform-sdk';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';

import { mockProduct1 } from '~/features/fetch-products/config/mockProducts';

import { ProductDetail } from './productDetail';

vi.mock('./productDetailCarousel', () => ({
  ProductCarousel: ({ identifier }: { identifier: string }) => (
    <div data-testid={`${identifier}-carousel`}>Product Carousel</div>
  ),
}));
vi.mock('~/components/ui/marquee', () => ({
  default: ({ items }: { items: string[] }) => <div data-testid="marquee">{items.join(', ')}</div>,
}));

vi.mock('~/features/fetch-products/utils/calculateDiscount', () => ({
  calculateDiscount: vi.fn(() => 20),
}));

describe('ProductDetail', () => {
  const defaultProduct = mockProduct1;

  it('should render fallback text when description is missing', () => {
    const productWithoutDescription: ProductProjection = {
      ...defaultProduct,
      description: undefined,
    };

    const IMAGE_FALLBACK_TEXT = 'No description available';

    render(
      <MemoryRouter>
        <ProductDetail product={productWithoutDescription} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('test-product-slug-description')).toHaveTextContent(IMAGE_FALLBACK_TEXT);
  });

  it('should render marquee when product has discount', () => {
    render(
      <MemoryRouter>
        <ProductDetail product={defaultProduct} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('marquee')).toHaveTextContent('-20%');
  });
});
