type PriceProps = {
  price: number;
};

const PENCE_PER_POUND = 100;
const CURRENCY_DECIMALS = 2;

export const PriceElement = ({ price }: PriceProps) => {
  const computedPrice = (price / PENCE_PER_POUND).toFixed(CURRENCY_DECIMALS);

  return (
    <div>
      💷 <span className="font-bold">Price</span> &pound;{computedPrice}
    </div>
  );
};
