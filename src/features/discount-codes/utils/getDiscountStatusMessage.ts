import { DISCOUNT_STATUS_MESSAGES } from '~features/discount-codes/configs/discountStatusMessages';

export const getDiscountStatusMessage = (state: string): string => {
  return DISCOUNT_STATUS_MESSAGES[state] ?? `The discount code is not valid: ${state}`;
};
