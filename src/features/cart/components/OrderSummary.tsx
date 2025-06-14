import type { Cart } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';

import { formatPriceWithCurrency } from '../utils/formatPriceWithCurrency';

type OrderSummaryProps = {
  cart: Cart;
};

const TEXTS = {
  TITLE: 'Order details',
  SUBTOTAL: 'Subtotal',
  SHIPPING: 'Shipping',
  TAX: 'Tax',
  TOTAL: 'Total',
  ITEMS: 'items',
  FREE: 'Free',
  CALCULATED_AT_CHECKOUT: 'Calculated at checkout',
  CTA: 'Checkout',
  TAX_RATE: 'Tax rate',
  FIELD: 'Field',
  VALUE: 'Value',
  CTA_TEXT: 'Checkout',
};

export const OrderSummary = ({ cart }: OrderSummaryProps) => {
  return (
    <div className="grid gap-4">
      <h3 className="text-left text-lg font-bold uppercase">{TEXTS.TITLE}</h3>
      <table className="w-full border-collapse">
        <thead className="sr-only">
          <tr>
            <th>{TEXTS.FIELD}</th>
            <th>{TEXTS.VALUE}</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-border border-b">
            <td className="py-2 text-left uppercase">{TEXTS.SUBTOTAL}</td>
            <td className="py-2 text-right">{formatPriceWithCurrency(cart.totalPrice.centAmount)}</td>
          </tr>
          <tr className="border-border border-b">
            <td className="py-2 text-left capitalize">{TEXTS.ITEMS}</td>
            <td className="py-2 text-right">{cart.totalLineItemQuantity ?? 0} </td>
          </tr>
          <tr className="border-border border-b">
            <td className="py-2 text-left">{TEXTS.SHIPPING}</td>
            <td className="py-2 text-right">{TEXTS.FREE}</td>
          </tr>
          <tr className="border-border border-b-2">
            <td className="py-2 text-left">{TEXTS.TAX}</td>
            <td className="py-2 text-right">{TEXTS.CALCULATED_AT_CHECKOUT}</td>
          </tr>
          <tr>
            <td className="py-3 text-left text-lg font-bold">{TEXTS.TOTAL}</td>
            <td className="py-3 text-right text-lg font-bold">{formatPriceWithCurrency(cart.totalPrice.centAmount)}</td>
          </tr>
        </tbody>
      </table>
      <Button className="justify-self-end" size="lg">
        {TEXTS.CTA_TEXT}
      </Button>
    </div>
  );
};
