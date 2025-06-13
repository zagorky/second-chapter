import { formatPrice } from '~features/fetch-products/utils/formatPrice';

const DEFAULT_CURRENCY_SYMBOL = '£';

export const formatPriceWithCurrency = (price: number, currency = DEFAULT_CURRENCY_SYMBOL) =>
  `${currency}${formatPrice(price)}`;
