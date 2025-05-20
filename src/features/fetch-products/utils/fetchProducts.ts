import { apiInstance } from '~app/API/apiBuilder';

export const fetchProducts = async () => {
  const response = await apiInstance.root
    .productProjections()
    .get({ queryArgs: { limit: 10 } })
    .execute();

  return response.body.results;
};
