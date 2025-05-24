import { formatPrice } from '~features/fetch-products/utils/formatPrice';
import { cn } from '~lib/utilities';
import { withDataTestId } from '~utils/helpers';

type PriceProps = {
  originalPrice: number;
  discountedPrice: number;
  id: string;
  className?: string;
};

export const PriceElement = ({ originalPrice, discountedPrice, id, className }: PriceProps) => {
  const computedOriginalPrice = formatPrice(originalPrice);
  const computedDiscountedPrice = formatPrice(discountedPrice);

  if (discountedPrice) {
    return (
      <div
        className={cn('rounded-r-base text-background bg-destructive/85 font-bold', className)}
        {...withDataTestId(`${id}-price`)}
      >
        <span className="text-2xl">&pound;{computedDiscountedPrice}</span>{' '}
        <span className="text-lg line-through">&pound;{computedOriginalPrice}</span>
      </div>
    );
  }

  return (
    <div
      className={cn('rounded-r-base text-background bg-main text-2xl font-bold', className)}
      {...withDataTestId(`${id}-price`)}
    >
      &pound;{computedOriginalPrice}
    </div>
  );
};
