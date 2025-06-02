import { apiInstance } from '~/app/API/apiBuilder';

export const fetchPassword = async () => {
  const response = await apiInstance.root.me().get().execute();

  return response.body;
};

export const updatePassword = async (currentPassword: string, newPassword: string) => {
  const customer = await fetchPassword();
  const response = await apiInstance.root
    .me()
    .password()
    .post({ body: { currentPassword, newPassword, version: customer.version } })
    .execute();

  return response.body;
};
