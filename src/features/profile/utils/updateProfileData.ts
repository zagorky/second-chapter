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

const minSymbolLength = 2;

function toLocalDateString(dateString: string): string {
  const date = new Date(dateString);
  const year = String(date.getFullYear());
  const month = (date.getMonth() + 1).toString().padStart(minSymbolLength, '0');
  const day = date.getDate().toString().padStart(minSymbolLength, '0');

  return `${year}-${month}-${day}`;
}

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
      dateOfBirth: toLocalDateString(updatedProfileData.dateOfBirth),
    };

    updateActions.push(action);
  }

  if (updateActions.length === 0) return;

  try {
    await apiInstance.root
      .me()
      .post({
        body: {
          version,
          actions: updateActions,
        },
      })
      .execute();
  } catch (error: unknown) {
    if (isCommercetoolsError(error)) {
      if (
        error.body?.errors?.some(
          (error_: unknown) =>
            isCommercetoolsFieldError(error_) && error_.code === 'DuplicateField' && error_.field === 'email'
        )
      ) {
        throw new Error('EMAIL_ALREADY_EXISTS');
      }
      throw error;
    }
  }
};

function isCommercetoolsError(
  error: unknown
): error is Error & { body?: { errors?: { code: string; field?: string }[] } } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'body' in error &&
    typeof error.body === 'object'
  );
}

function isCommercetoolsFieldError(error: unknown): error is { code: string; field?: string } {
  return typeof error === 'object' && error !== null && 'code' in error && typeof error.code === 'string';
}
