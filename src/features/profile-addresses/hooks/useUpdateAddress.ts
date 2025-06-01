import type { BaseAddress } from '@commercetools/platform-sdk';

import { useCallback } from 'react';
import { toast } from 'sonner';
import useSWR from 'swr';

import { fetchAddresses } from '../utils/fetchAddresses';
import { updateAddress } from '../utils/updateAddress';

export const useUpdateAddress = () => {
  const { data: addresses, error, isLoading, mutate } = useSWR<BaseAddress[], Error>('addresses', fetchAddresses);

  const updateAddressHandler = useCallback(
    async (
      addressId: string,
      updatedAddressData: {
        streetName?: string;
        city?: string;
        postalCode?: string;
        country?: string;
      }
    ) => {
      try {
        await updateAddress(addressId, updatedAddressData);
        await mutate();
        toast.success('Address updated successfully!');

        return true;
      } catch (error) {
        toast.error('Failed to update address');
        throw error;
      }
    },
    [mutate]
  );

  return {
    addresses,
    error,
    isLoading,
    updateAddress: updateAddressHandler,
    refresh: mutate,
  };
};
