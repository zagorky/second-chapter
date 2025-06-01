import { apiInstance } from '~/app/API/apiBuilder';

export const fetchCustomer = async () => {
  try {
    const response = await apiInstance.root.me().get().execute();

    const { firstName, lastName, email, dateOfBirth } = response.body;

    return { firstName, lastName, email, dateOfBirth };
  } catch (error) {
    console.error('Error fetching customer:', error);
  }
};
