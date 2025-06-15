import type { Cart } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { formatPrice } from '~features/fetch-products/utils/formatPrice';
import { cn } from '~lib/utilities';

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
  DISCOUNT: 'Discount code savings',
};

const getTotalPrice = (cart: Cart) => {
  const totalPrice = cart.totalPrice.centAmount;
  const totalFullPrice = cart.lineItems.reduce((acc, item) => {
    const itemFullPrice = (item.price.discounted?.value.centAmount ?? item.price.value.centAmount) * item.quantity;

    return acc + itemFullPrice;
  }, 0);

  return { totalDiscounts: totalFullPrice - totalPrice, totalFullPrice };
};

export const OrderSummary = ({ cart }: OrderSummaryProps) => {
  const { totalDiscounts, totalFullPrice } = getTotalPrice(cart);

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
            <td className={cn('py-2 text-right', totalDiscounts > 0 && 'line-through')}>
              {formatPrice(totalFullPrice)}
            </td>
          </tr>
          {totalDiscounts > 0 && (
            <tr className="border-border border-b">
              <td className="py-2 text-left">{TEXTS.DISCOUNT}</td>
              <td className={cn('text-main py-2 text-right')}>{formatPrice(totalDiscounts)}</td>
            </tr>
          )}
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
            <td className="py-3 text-left text-lg font-bold uppercase">{TEXTS.TOTAL}</td>
            <td className="py-3 text-right text-lg font-bold">{formatPrice(cart.totalPrice.centAmount)}</td>
          </tr>
        </tbody>
      </table>
      <Button className="justify-self-end" size="lg">
        {TEXTS.CTA_TEXT}
      </Button>
    </div>
  );
};
