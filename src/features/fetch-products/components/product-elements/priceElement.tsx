import { formatPrice } from '~features/fetch-products/utils/formatPrice';
import { withDataTestId } from '~utils/helpers';

type PriceProps = {
  originalPrice: number;
  discountedPrice: number;
  id: string;
};

export const PriceElement = ({ originalPrice, discountedPrice, id }: PriceProps) => {
  const computedOriginalPrice = formatPrice(originalPrice);
  const computedDiscountedPrice = formatPrice(discountedPrice);

  if (discountedPrice) {
    return (
      <div {...withDataTestId(`${id}-price`)}>
        💷 <span className="font-bold">Price</span>{' '}
        <span className="text-destructive font-bold">{computedDiscountedPrice}</span>
        <span className="text-foreground text-sm">
          &nbsp;
          <span className="line-through">{computedOriginalPrice}</span>
        </span>
      </div>
    );
  }

  return (
    <div {...withDataTestId(`${id}-price`)}>
      💷 <span className="font-bold">Price</span> &pound;{computedOriginalPrice}
    </div>
  );
};
