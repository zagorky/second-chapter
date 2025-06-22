import { apiInstance } from '~app/API/apiBuilder';

export const getDiscountCodes = async () => {
  const response = await apiInstance.root.discountCodes().get().execute();

  return response.body;
};
