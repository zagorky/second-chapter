import type { LineItem, Cart } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { Image } from '~components/ui/image';
import { DEFAULT_STORE_LANGUAGE } from '~config/constants';
import { calculateLineItemDiscount } from '~features/cart/utils/calculateLineItemDiscount';
import { formatPriceWithCurrency } from '~features/cart/utils/formatPriceWithCurrency';
import { removeProductFromCart } from '~features/cart/utils/removeProductFromCart';
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router';

import { navigationRoutes } from '~/config/navigation';
import { getStringAttribute } from '~/types/utils/attributesGuards';

import { QuantityControls } from './QuantityControls';

export const CartItem = ({ item, cart, refresh }: { item: LineItem; cart: Cart; refresh: () => void }) => {
  const DEFAULT_IMAGE_SIZE = 150;
  const { discountPercentage, isDiscounted, discountedPrice, fullPrice } = calculateLineItemDiscount(item);
  const navigate = useNavigate();
  const author = getStringAttribute(item.variant.attributes, 'author');

  return (
    <li
      key={item.id}
      className="border-border rounded-base bg-background group flex justify-between gap-4 border-2 p-4"
    >
      <div className="gap-4 sm:flex sm:justify-between">
        <Image
          borders="base"
          src={item.variant.images?.[0]?.url ?? ''}
          alt={item.name[DEFAULT_STORE_LANGUAGE]}
          size={DEFAULT_IMAGE_SIZE}
          className="select-none"
          {...(item.variant.images?.[0]?.dimensions && {
            width: item.variant.images[0].dimensions.w,
            height: item.variant.images[0].dimensions.h,
          })}
        />
        <div className="flex flex-grow flex-col items-start gap-5">
          <div className="flex flex-col items-start gap-1">
            <div className="w-fit">
              <Button
                className="flex-col gap-1"
                variant="ghostGroupHover"
                size="noPadding"
                onClick={() => void navigate(`${navigationRoutes.product.path}/${item.productKey ?? ''}`)}
              >
                <div className="m-0 font-bold uppercase">{item.name[DEFAULT_STORE_LANGUAGE]}</div>
              </Button>
            </div>

            <div>{author}</div>
            <div className="flex items-center gap-2 text-sm opacity-70">
              <div>{formatPriceWithCurrency(isDiscounted ? discountedPrice : fullPrice)}</div>
              {isDiscounted && <div>(-{discountPercentage}%)</div>}
            </div>
          </div>

          <div className="grid gap-2">
            <QuantityControls cart={cart} productId={item.productId} lineItemId={item.id} quantity={item.quantity} />
            {formatPriceWithCurrency(item.totalPrice.centAmount)}
          </div>
        </div>
      </div>

      <Button
        variant="neutral"
        size="icon"
        onClick={() =>
          void removeProductFromCart({
            cartId: cart.id,
            lineItemId: item.id,
            cartVersion: cart.version,
            quantity: item.quantity,
          }).then(refresh)
        }
      >
        <Trash />
      </Button>
    </li>
  );
};
