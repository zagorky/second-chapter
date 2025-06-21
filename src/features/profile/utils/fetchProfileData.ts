import { apiInstance } from '~/app/API/apiBuilder';

export const fetchProfileData = async () => {
  try {
    const response = await apiInstance.root.me().get().execute();

    const { id, firstName, lastName, email, dateOfBirth } = response.body;

    return { id, firstName, lastName, email, dateOfBirth };
  } catch (error) {
    console.error('Error fetching customer:', error);
  }
};
