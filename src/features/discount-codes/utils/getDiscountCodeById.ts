import { apiInstance } from '~app/API/apiBuilder';

export const getDiscountCodeById = async (id: string) => {
  const response = await apiInstance.root.discountCodes().withId({ ID: id }).get().execute();

  return response.body;
};
