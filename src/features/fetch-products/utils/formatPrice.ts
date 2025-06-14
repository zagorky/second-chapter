const PENCE_PER_POUND = 100;
const CURRENCY_DECIMALS = 2;
const DEFAULT_CURRENCY_SYMBOL = '£';

export const formatPrice = (price: number, currencySymbol = DEFAULT_CURRENCY_SYMBOL) => {
  if (price < 0) {
    return 'Incorrect Price';
  }

  if (price === 0) {
    return 'Free';
  }

  if (price > 0) {
    return `${currencySymbol} ${(price / PENCE_PER_POUND).toFixed(CURRENCY_DECIMALS)}`;
  }
};
