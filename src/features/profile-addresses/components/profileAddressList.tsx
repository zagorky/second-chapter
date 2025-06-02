import { DataErrorElement } from '~components/ui/data-error-element/dataErrorElement';
import { Spinner } from '~components/ui/spinner/spinner';
import { normalizeError } from '~utils/normalizeError';

import { useUpdateAddress } from '../hooks/useUpdateAddress';
import { ProfileAddressItem } from './profileAddressItem';

const ADDRESSES_TEXTS = {
  NO_ADDRESSES_FOUND: 'No addresses found',
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

    if (addresses === undefined || addresses.length === 0) {
      return <div>{ADDRESSES_TEXTS.NO_ADDRESSES_FOUND}</div>;
    }

    return (
      <div>
        <ul className="grid gap-6">
          {addresses.map((address) => (
            <li key={address.id}>
              <ProfileAddressItem address={address} onAddressUpdated={() => void refresh()} />
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return <div>{renderContent()}</div>;
};
