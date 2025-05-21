import { formatPrice } from '~features/fetch-products/utils/formatPrice';

type PriceProps = {
  originalPrice: number;
  discountedPrice: number;
};

export const PriceElement = ({ originalPrice, discountedPrice }: PriceProps) => {
  const computedOriginalPrice = formatPrice(originalPrice);
  const computedDiscountedPrice = formatPrice(discountedPrice);

  if (discountedPrice) {
    return (
      <div>
        💷 <span className="font-bold">Price</span>{' '}
        <span className="font-bold text-red-700">&pound;{computedDiscountedPrice}</span>
        <span className="text-foreground text-sm">
          &nbsp;
          <span className="line-through">&pound;{computedOriginalPrice}</span>
        </span>
      </div>
    );
  }

  return (
    <div>
      💷 <span className="font-bold">Price</span> &pound;{computedOriginalPrice}
    </div>
  );
};
