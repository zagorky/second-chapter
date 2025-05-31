import type { ProductProjection } from '@commercetools/platform-sdk';

import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { mockProduct1 } from '~/features/fetch-products/config/mockProducts';

import { ProductDetail } from './productDetail';

vi.mock('./useProductCategories', () => ({
  useProductCategories: vi.fn(() => ({
    categoryNames: ['fiction', 'non-fiction'],
    isLoading: false,
  })),
}));

vi.mock('./productCarousel', () => ({
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

    render(<ProductDetail product={productWithoutDescription} />);

    expect(screen.getByTestId('test-product-slug-description')).toHaveTextContent(IMAGE_FALLBACK_TEXT);
  });

  it('should render marquee when product has discount', () => {
    render(<ProductDetail product={defaultProduct} />);

    expect(screen.getByTestId('marquee')).toHaveTextContent('-20%');
  });
});
