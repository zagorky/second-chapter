import type { Customer } from '@commercetools/platform-sdk';

import { useCallback } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';

import { normalizeError } from '~/utils/normalizeError';

import { updateAddress, createAddress, removeAddress } from '../utils/customerAddressUpdateActions';
import { fetchCustomer } from '../utils/fetchCustomer';

export const useUpdateAddress = () => {
  const { data: customer, error, isLoading, mutate } = useSWR<Customer, Error>('customer', fetchCustomer);

  const updateAddressHandler = useCallback(
    async (parameters: {
      addressId: string;
      addressData: {
        streetName: string;
        city: string;
        postalCode: string;
        country: string;
      };
      setShipping: boolean;
      setBilling: boolean;
      makeDefaultShipping: boolean;
      makeDefaultBilling: boolean;
    }) => {
      try {
        await updateAddress(parameters);
        await mutate();
        toast.success('Address updated successfully');

        return true;
      } catch (error) {
        throw normalizeError(error);
      }
    },
    [mutate]
  );

  const createAddressHandler = useCallback(
    async (parameters: {
      addressData: {
        streetName: string;
        city: string;
        postalCode: string;
        country: string;
      };
      setShipping: boolean;
      setBilling: boolean;
      makeDefaultShipping: boolean;
      makeDefaultBilling: boolean;
    }) => {
      await createAddress(parameters);
      await mutate();
      toast.success('Address created successfully!');

      return true;
    },
    [mutate]
  );

  const removeAddressHandler = useCallback(
    async (addressId: string) => {
      try {
        await removeAddress(addressId);
        await mutate();
        toast.success('Address deleted successfully');

        return true;
      } catch (error) {
        throw normalizeError(error);
      }
    },
    [mutate]
  );

  return {
    customer,
    addresses: customer?.addresses ?? [],
    error,
    isLoading,
    updateAddress: updateAddressHandler,
    createAddress: createAddressHandler,
    removeAddress: removeAddressHandler,
    refresh: mutate,
  };
};
