import type { BaseAddress } from '@commercetools/platform-sdk';
import type { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/ui/button/button';
import { Checkbox } from '~components/ui/checkbox';
import { Spinner } from '~components/ui/spinner/spinner';
import { AddressForm } from '~features/sign-up/components/addressForm';
import { addressUpdateSchema } from '~features/sign-up/types/shemas';
import { X } from 'lucide-react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Label } from '~/components/ui/label';
import { normalizeError } from '~/utils/normalizeError';

import { useUpdateAddress } from '../hooks/useUpdateAddress';

type ProfileAddressItemProps = {
  address: BaseAddress;
  onAddressUpdated?: () => void;
  onCancel?: () => void;
  isNew?: boolean;
};

type AddressFormData = z.infer<typeof addressUpdateSchema>;

export const ProfileAddressItem = ({ address, onAddressUpdated, onCancel, isNew }: ProfileAddressItemProps) => {
  const addressId = address.id ?? '';
  const [isEditing, setIsEditing] = useState(isNew ?? false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { customer, updateAddress, createAddress, removeAddress } = useUpdateAddress();

  const CHECKBOX_LABELS = {
    SHIPPING: 'Shipping Address',
    BILLING: 'Billing Address',
    DEFAULT_SHIPPING: 'Default shipping address',
    DEFAULT_BILLING: 'Default billing address',
  };

  const EDIT_MODE_TEXTS = {
    EDIT_BUTTON: 'Edit',
    CANCEL_BUTTON: 'Cancel',
    SAVE_BUTTON: 'Save',
    DELETE_BUTTON: 'Delete',
  };

  const ERRORS = {
    ADDRESS_ID_REQUIRED: 'Address ID is required for update',
    FAILED_TO_UPDATE_ADDRESS: 'Failed to update address',
  };

  const isShippingAddress = customer?.shippingAddressIds?.includes(addressId) ?? false;
  const isBillingAddress = customer?.billingAddressIds?.includes(addressId) ?? false;
  const isDefaultShippingAddress = customer?.defaultShippingAddressId === addressId;
  const isDefaultBillingAddress = customer?.defaultBillingAddressId === addressId;

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressUpdateSchema),
    defaultValues: {
      streetName: address.streetName ?? '',
      city: address.city ?? '',
      postalCode: address.postalCode ?? '',
      country: 'GB',
      isShippingAddress,
      isBillingAddress,
      isDefaultShippingAddress,
      isDefaultBillingAddress,
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleEdit = () => {
    form.setValue('isShippingAddress', isShippingAddress);
    form.setValue('isBillingAddress', isBillingAddress);
    form.setValue('isDefaultShippingAddress', isDefaultShippingAddress);
    form.setValue('isDefaultBillingAddress', isDefaultBillingAddress);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!isNew && !addressId) {
        throw new Error(ERRORS.ADDRESS_ID_REQUIRED);
      }

      const isValid = await form.trigger();

      if (!isValid) {
        return;
      }

      setIsSaving(true);
      const formData = form.getValues();

      const addressDraftBase = {
        addressData: {
          streetName: formData.streetName,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        setShipping: !!formData.isShippingAddress,
        setBilling: !!formData.isBillingAddress,
        makeDefaultShipping: !!formData.isDefaultShippingAddress,
        makeDefaultBilling: !!formData.isDefaultBillingAddress,
      };

      await (isNew ? createAddress(addressDraftBase) : updateAddress({ ...addressDraftBase, addressId }));

      setIsEditing(false);
      onAddressUpdated?.();
    } catch (error) {
      toast.error(`${ERRORS.FAILED_TO_UPDATE_ADDRESS}: ${normalizeError(error).message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (isNew) {
      onCancel?.();
    } else {
      form.reset({
        streetName: address.streetName ?? '',
        city: address.city ?? '',
        postalCode: address.postalCode ?? '',
        country: 'GB',
        isShippingAddress,
        isBillingAddress,
        isDefaultShippingAddress,
        isDefaultBillingAddress,
      });
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (!addressId) {
        throw new Error('Address ID is required for deletion');
      }

      setIsDeleting(true);
      await removeAddress(addressId);
      onAddressUpdated?.();
    } catch (error) {
      toast.error(`Failed to delete address: ${normalizeError(error).message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form className="rounded-base border-border bg-background space-y-4 border-2 p-6">
      <h3 className="text-lg font-medium">
        {address.firstName} {address.lastName}
      </h3>
      <div className="flex justify-between gap-2">
        {!isNew && (
          <Button variant="neutral" size="sm" type="button" onClick={() => void handleDelete()} disabled={isDeleting}>
            {isDeleting ? <Spinner size="md" /> : <X />}
            {EDIT_MODE_TEXTS.DELETE_BUTTON}
          </Button>
        )}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button variant="ghost" size="sm" onClick={handleCancel} type="button">
                {EDIT_MODE_TEXTS.CANCEL_BUTTON}
              </Button>
              <Button size="sm" onClick={() => void handleSave()} type="button" disabled={isSaving}>
                {isSaving ? <Spinner size="md" /> : EDIT_MODE_TEXTS.SAVE_BUTTON}
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
        <div className="grid w-fit gap-4 md:grid-cols-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id={`${String(addressId)}-address-shipping`}
              checked={isEditing ? form.watch('isShippingAddress') : isShippingAddress}
              onCheckedChange={(checked) => {
                form.setValue('isShippingAddress', checked === true);
              }}
              disabled={!isEditing}
            />
            <Label htmlFor={`${String(addressId)}-address-shipping`}>{CHECKBOX_LABELS.SHIPPING}</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id={`${String(addressId)}-address-default-shipping`}
              checked={isEditing ? form.watch('isDefaultShippingAddress') : isDefaultShippingAddress}
              onCheckedChange={(checked) => {
                form.setValue('isDefaultShippingAddress', checked === true);
              }}
              disabled={!isEditing}
            />
            <Label htmlFor={`${String(addressId)}-address-default-shipping`}>{CHECKBOX_LABELS.DEFAULT_SHIPPING}</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id={`${String(addressId)}-address-billing`}
              checked={form.watch('isBillingAddress')}
              onCheckedChange={(checked) => {
                form.setValue('isBillingAddress', checked === true);
              }}
              disabled={!isEditing}
            />
            <Label htmlFor={`${String(addressId)}-address-billing`}>{CHECKBOX_LABELS.BILLING}</Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id={`${String(addressId)}-address-default-billing`}
              checked={isEditing ? form.watch('isDefaultBillingAddress') : isDefaultBillingAddress}
              onCheckedChange={(checked) => {
                form.setValue('isDefaultBillingAddress', checked === true);
              }}
              disabled={!isEditing}
            />
            <Label htmlFor={`${String(addressId)}-address-default-billing`}>{CHECKBOX_LABELS.DEFAULT_BILLING}</Label>
          </div>
        </div>
      </FormProvider>
    </form>
  );
};
