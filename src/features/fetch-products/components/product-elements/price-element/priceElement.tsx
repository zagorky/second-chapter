import { formatPrice } from '~features/fetch-products/utils/formatPrice';
import { cn } from '~lib/utilities';
import { withDataTestId } from '~utils/helpers';

import { priceElementVariants } from './priceElementVariants';

type PriceProps = {
  originalPrice: number;
  discountedPrice: number;
  id: string;
  className?: string;
  type?: 'card' | 'standalone';
  price?: 'full' | 'discounted';
};

export const PriceElement = ({
  originalPrice,
  discountedPrice,
  id,
  className,
  type = 'card',
  price = discountedPrice > 0 ? 'discounted' : 'full',
}: PriceProps) => {
  const computedOriginalPrice = formatPrice(originalPrice);
  const computedDiscountedPrice = formatPrice(discountedPrice);

  price = type === 'standalone' ? 'full' : price;

  if (originalPrice < 0) {
    return (
      <div
        className={cn(priceElementVariants({ type, price: 'full' }), className, '')}
        {...withDataTestId(`${id}-price`)}
      >
        {computedOriginalPrice}
      </div>
    );
  }

  return (
    <div className={cn(priceElementVariants({ type, price }), className, '')} {...withDataTestId(`${id}-price`)}>
      {discountedPrice > 0 ? (
        <>
          <span>{computedDiscountedPrice}</span>{' '}
          <span className="text-lg font-black line-through">{computedOriginalPrice}</span>
        </>
      ) : (
        <>{computedOriginalPrice}</>
      )}
    </div>
  );
};
