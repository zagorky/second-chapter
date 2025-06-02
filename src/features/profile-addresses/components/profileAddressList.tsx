import { DataErrorElement } from '~components/ui/data-error-element/dataErrorElement';
import { Spinner } from '~components/ui/spinner/spinner';
import { normalizeError } from '~utils/normalizeError';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '~/components/ui/button/button';

import { useUpdateAddress } from '../hooks/useUpdateAddress';
import { ProfileAddressItem } from './profileAddressItem';

const ADDRESSES_TEXTS = {
  NO_ADDRESSES_FOUND: 'No addresses found',
  ADD_ADDRESS_BUTTON: 'Create new address',
};

type NewAddress = {
  id: string;
  streetName: string;
  city: string;
  postalCode: string;
  country: string;
  firstName: string;
  lastName: string;
};

const createNewAddress = (): NewAddress => ({
  id: `temp-${String(Date.now())}`,
  streetName: '',
  city: '',
  postalCode: '',
  country: 'GB',
  firstName: '',
  lastName: '',
});

export const ProfileAddressList = () => {
  const { addresses, error, isLoading, refresh } = useUpdateAddress();
  const [newAddress, setNewAddress] = useState<NewAddress | null>(null);

  const handleAddAddress = () => {
    setNewAddress(createNewAddress());
  };

  const handleNewAddressCancel = () => {
    setNewAddress(null);
  };

  const handleNewAddressCreated = () => {
    setNewAddress(null);
    void refresh();
  };

  const renderContent = () => {
    if (error) {
      return <DataErrorElement errorText={normalizeError(error).message} retryAction={() => void refresh()} />;
    }

    if (isLoading) {
      return <Spinner className="m-auto" size="xl" />;
    }

    if (addresses.length === 0 && !newAddress) {
      return <div>{ADDRESSES_TEXTS.NO_ADDRESSES_FOUND}</div>;
    }

    return (
      <div className="grid gap-6">
        <ul className="contents">
          {addresses.map((address) => (
            <li key={address.id}>
              <ProfileAddressItem address={address} onAddressUpdated={() => void refresh()} />
            </li>
          ))}
          {newAddress && (
            <li key={newAddress.id}>
              <ProfileAddressItem
                address={newAddress}
                onAddressUpdated={handleNewAddressCreated}
                onCancel={handleNewAddressCancel}
                isNew={true}
              />
            </li>
          )}
        </ul>
        <Button onClick={handleAddAddress} disabled={!!newAddress}>
          <Plus />
          {ADDRESSES_TEXTS.ADD_ADDRESS_BUTTON}
        </Button>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};
