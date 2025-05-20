type PriceProps = {
  originalPrice: number;
  discountedPrice: number;
};

const PENCE_PER_POUND = 100;
const CURRENCY_DECIMALS = 2;

export const PriceElement = ({ originalPrice, discountedPrice }: PriceProps) => {
  const computedOriginalPrice = (originalPrice / PENCE_PER_POUND).toFixed(CURRENCY_DECIMALS);
  const computedDiscountedPrice = (discountedPrice / PENCE_PER_POUND).toFixed(CURRENCY_DECIMALS);

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
