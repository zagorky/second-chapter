import { apiInstance } from '~app/API/apiBuilder';

export const fetchCategories = async () => {
  const response = await apiInstance.root.categories().get().execute();

  return response.body.results;
};
