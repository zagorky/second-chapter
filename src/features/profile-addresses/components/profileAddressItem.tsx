import type { BaseAddress } from '@commercetools/platform-sdk';
import type { CustomCustomerAddress } from '~app/API/types/customCustomerDraft';

import { Button } from '~components/ui/button/button';
import { AddressForm } from '~features/sign-up/components/addressForm';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useUpdateAddress } from '../hooks/useUpdateAddress';

type ProfileAddressItemProps = {
  address: BaseAddress;
  onAddressUpdated?: () => void;
};

export const ProfileAddressItem = ({ address, onAddressUpdated }: ProfileAddressItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { updateAddress } = useUpdateAddress();

  const form = useForm<CustomCustomerAddress>({
    defaultValues: {
      streetName: address.streetName ?? '',
      city: address.city ?? '',
      postalCode: address.postalCode ?? '',
      country: 'GB',
    },
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!address.id) {
        throw new Error('Address ID is required for update');
      }

      setIsSaving(true);
      const formData = form.getValues();

      await updateAddress(address.id, {
        streetName: formData.streetName,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      });

      setIsEditing(false);
      onAddressUpdated?.();
    } catch (error) {
      console.error('Failed to update address:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditing(false);
  };

  const EDIT_MODE_TEXTS = {
    EDIT_BUTTON: 'Edit',
    CANCEL_BUTTON: 'Cancel',
    SAVE_BUTTON: 'Save',
    UPDATE_IN_PROGRESS: 'Saving...',
  };

  return (
    <form className="rounded-base border-border space-y-4 border-2 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          {address.firstName} {address.lastName}
        </h3>
        <div className="space-x-2">
          {isEditing ? (
            <>
              <Button variant="ghost" size="sm" onClick={handleCancel} type="button">
                {EDIT_MODE_TEXTS.CANCEL_BUTTON}
              </Button>
              <Button size="sm" onClick={() => void handleSave()} type="button" disabled={isSaving}>
                {isSaving ? EDIT_MODE_TEXTS.UPDATE_IN_PROGRESS : EDIT_MODE_TEXTS.SAVE_BUTTON}
              </Button>
            </>
          ) : (
            <Button variant="neutral" size="sm" onClick={handleEdit} type="button">
              {EDIT_MODE_TEXTS.EDIT_BUTTON}
            </Button>
          )}
        </div>
      </div>

      <FormProvider {...form}>
        <AddressForm
          streetPrefix="streetName"
          cityPrefix="city"
          postalCodePrefix="postalCode"
          countryPrefix="country"
          control={form.control}
          title={''}
          readOnly={!isEditing}
        />
      </FormProvider>
    </form>
  );
};
