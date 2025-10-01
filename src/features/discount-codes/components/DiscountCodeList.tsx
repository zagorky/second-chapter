import type { Cart } from '@commercetools/platform-sdk';

import { getDiscountStatusMessage } from '~features/discount-codes/utils/getDiscountStatusMessage';

import { getDiscountCodeInfo } from '~/features/discount-codes/utils/getDiscountCodeInfo';

import { DiscountCodeItem } from './DiscountCodeItem';

type DiscountCodeListProps = {
  cart: Cart;
};

const TEXTS = {
  TITLE: 'Active discount codes',
};

export const DiscountCodeList = ({ cart }: DiscountCodeListProps) => {
  if (cart.discountCodes.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-left text-sm font-medium uppercase">{TEXTS.TITLE}</h3>
      <ul className="space-y-2">
        {cart.discountCodes.map((code) => (
          <DiscountCodeItem
            key={code.discountCode.obj?.id}
            code={code}
            cart={cart}
            getDiscountCodeInfo={getDiscountCodeInfo}
            getDiscountStatusMessage={getDiscountStatusMessage}
          />
        ))}
      </ul>
    </div>
  );
};
