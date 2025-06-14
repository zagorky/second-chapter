import type { LineItem, Cart } from '@commercetools/platform-sdk';

import { Button } from '~components/ui/button/button';
import { Image } from '~components/ui/image';
import { DEFAULT_STORE_LANGUAGE } from '~config/constants';
import { calculateLineItemDiscount } from '~features/cart/utils/calculateLineItemDiscount';
import { getIsGifted } from '~features/cart/utils/getIsGifted';
import { removeProductFromCart } from '~features/cart/utils/removeProductFromCart';
import { formatPrice } from '~features/fetch-products/utils/formatPrice';
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router';

import { navigationRoutes } from '~/config/navigation';
import { getStringAttribute } from '~/types/utils/attributesGuards';

import { GiftBadge } from './GiftBadge';
import { QuantityControls } from './QuantityControls';

export const CartItem = ({ item, cart, refresh }: { item: LineItem; cart: Cart; refresh: () => void }) => {
  const DEFAULT_IMAGE_SIZE = 150;
  const { discountPercentage, isDiscounted, discountedPrice, fullPrice } = calculateLineItemDiscount(item);
  const navigate = useNavigate();
  const author = getStringAttribute(item.variant.attributes, 'author');

  const isGifted = getIsGifted(item);

  const TEXTS = {
    FREE_ITEM: 'Free!',
    DISCOUNT_PERCENTAGE: (discountPercentage: number) => `${String(discountPercentage)}% off`,
  };

  return (
    <li
      key={item.id}
      className="border-border rounded-base bg-background group relative flex justify-between gap-4 border-2 p-4"
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="relative">
          {isGifted && (
            <div className="absolute -bottom-2 -left-2 -rotate-5">
              <GiftBadge />
            </div>
          )}
          <Image
            borders="base"
            src={item.variant.images?.[0]?.url ?? ''}
            alt={item.name[DEFAULT_STORE_LANGUAGE]}
            size={DEFAULT_IMAGE_SIZE}
            className="ml-0 select-none"
            {...(item.variant.images?.[0]?.dimensions && {
              width: item.variant.images[0].dimensions.w,
              height: item.variant.images[0].dimensions.h,
            })}
          />
        </div>
        <div className="flex flex-grow flex-col items-start gap-5">
          <div className="flex flex-col items-start gap-1">
            <div className="w-fit">
              <Button
                className="flex-col gap-1 text-left whitespace-normal"
                variant="ghostGroupHover"
                size="noPadding"
                onClick={() => void navigate(`${navigationRoutes.product.path}/${item.productKey ?? ''}`)}
              >
                <div className="m-0 font-bold uppercase">{item.name[DEFAULT_STORE_LANGUAGE]}</div>
              </Button>
            </div>

            <div>{author}</div>
            <div className="flex items-center gap-2 text-sm opacity-70">
              <div>{formatPrice(isDiscounted ? discountedPrice : fullPrice)}</div>
              {isDiscounted && <div>({TEXTS.DISCOUNT_PERCENTAGE(discountPercentage)})</div>}
            </div>
          </div>

          <div className="grid gap-2">
            <QuantityControls cart={cart} lineItem={item} />
            {isGifted ? (
              <div className="flex items-center gap-2 font-bold uppercase">{TEXTS.FREE_ITEM}</div>
            ) : (
              formatPrice(item.totalPrice.centAmount)
            )}
          </div>
        </div>
      </div>
      {!isGifted && (
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
      )}
    </li>
  );
};
