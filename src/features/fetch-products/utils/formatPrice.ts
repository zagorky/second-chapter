const PENCE_PER_POUND = 100;
const CURRENCY_DECIMALS = 2;

export const formatPrice = (price: number) => (price / PENCE_PER_POUND).toFixed(CURRENCY_DECIMALS);
