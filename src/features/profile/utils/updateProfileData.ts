import type {
  MyCustomerUpdateAction,
  MyCustomerSetFirstNameAction,
  MyCustomerSetLastNameAction,
  MyCustomerSetDateOfBirthAction,
  MyCustomerChangeEmailAction,
} from '@commercetools/platform-sdk';

import { apiInstance } from '~/app/API/apiBuilder';

type UpdateProfileData = {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
};

export const updateProfile = async (updatedProfileData: UpdateProfileData): Promise<void> => {
  const customerResponse = await apiInstance.root.me().get().execute();
  const version = customerResponse.body.version;

  const updateActions: MyCustomerUpdateAction[] = [];

  if (updatedProfileData.firstName !== undefined) {
    const action: MyCustomerSetFirstNameAction = {
      action: 'setFirstName',
      firstName: updatedProfileData.firstName,
    };

    updateActions.push(action);
  }

  if (updatedProfileData.lastName !== undefined) {
    const action: MyCustomerSetLastNameAction = {
      action: 'setLastName',
      lastName: updatedProfileData.lastName,
    };

    updateActions.push(action);
  }

  if (updatedProfileData.email !== undefined) {
    const action: MyCustomerChangeEmailAction = {
      action: 'changeEmail',
      email: updatedProfileData.email,
    };

    updateActions.push(action);
  }

  if (updatedProfileData.dateOfBirth !== undefined) {
    const action: MyCustomerSetDateOfBirthAction = {
      action: 'setDateOfBirth',
      dateOfBirth: updatedProfileData.dateOfBirth.split('T')[0],
    };

    updateActions.push(action);
  }

  if (updateActions.length === 0) return;

  await apiInstance.root
    .me()
    .post({
      body: {
        version,
        actions: updateActions,
      },
    })
    .execute();
};
