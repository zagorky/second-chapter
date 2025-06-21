import type { Cart, LineItem } from '@commercetools/platform-sdk';

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';

import { CartItemsList } from './CartItemsList';

vi.mock('./EmptyCartContent', () => ({
  EmptyCartContent: () => <div data-testid="empty-cart-content"></div>,
}));

const createMockCart = (lineItems: LineItem[] = []): Cart => ({
  id: 'cart-id',
  version: 1,
  createdAt: '',
  lastModifiedAt: '',
  lineItems,
  customLineItems: [],
  totalPrice: {
    type: 'centPrecision',
    currencyCode: '',
    centAmount: 0,
    fractionDigits: 2,
  },
  taxMode: '',
  taxRoundingMode: '',
  taxCalculationMode: '',
  inventoryMode: '',
  cartState: '',
  shippingMode: '',
  shipping: [],
  itemShippingAddresses: [],
  discountCodes: [],
  directDiscounts: [],
  refusedGifts: [],
  origin: '',
});

const createMockLineItem = (id: string): LineItem => ({
  id,
  name: {},
  productId: '',
  productKey: '',
  productType: {
    typeId: 'product-type',
    id: '',
  },
  variant: {
    id: 1,
  },
  price: {
    id: '',
    value: {
      type: 'centPrecision',
      currencyCode: '',
      centAmount: 0,
      fractionDigits: 2,
    },
  },
  quantity: 1,
  totalPrice: {
    type: 'centPrecision',
    currencyCode: '',
    centAmount: 0,
    fractionDigits: 2,
  },
  lineItemMode: '',
  priceMode: '',
  taxRate: {
    name: '',
    amount: 0,
    includedInPrice: false,
    country: '',
    id: '',
  },
  discountedPricePerQuantity: [],
  taxedPricePortions: [],
  state: [],
  perMethodTaxRate: [],
});

describe('CartItemsList', () => {
  it('should render only EmptyCartContent when cart has no line items', () => {
    const emptyCart = createMockCart([]);

    render(
      <MemoryRouter>
        <CartItemsList cart={emptyCart} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('empty-cart-content')).toBeInTheDocument();
    expect(screen.queryByTestId('cart-items-list')).not.toBeInTheDocument();
  });

  it('should render only CartItemsList when cart has line items', () => {
    const cartWithItems = createMockCart([createMockLineItem('1'), createMockLineItem('2')]);

    render(
      <MemoryRouter>
        <CartItemsList cart={cartWithItems} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('cart-items-list')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-cart-content')).not.toBeInTheDocument();
  });
});
