import { DataErrorElement } from '~components/ui/data-error-element/dataErrorElement';
import { Spinner } from '~components/ui/spinner/spinner';
import { normalizeError } from '~utils/normalizeError';
import { Plus } from 'lucide-react';

import { Button } from '~/components/ui/button/button';

import { useUpdateAddress } from '../hooks/useUpdateAddress';
import { ProfileAddressItem } from './profileAddressItem';

const ADDRESSES_TEXTS = {
  NO_ADDRESSES_FOUND: 'No addresses found',
  ADD_ADDRESS_BUTTON: 'Create new address',
};

export const ProfileAddressList = () => {
  const { addresses, error, isLoading, refresh } = useUpdateAddress();

  const renderContent = () => {
    if (error) {
      return <DataErrorElement errorText={normalizeError(error).message} retryAction={() => void refresh()} />;
    }

    if (isLoading) {
      return <Spinner className="m-auto" size="xl" />;
    }

    if (addresses.length === 0) {
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
        </ul>
        <Button>
          <Plus />
          {ADDRESSES_TEXTS.ADD_ADDRESS_BUTTON}
        </Button>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};
