import { Tabs, TabsList, TabsTrigger, TabsContent } from '~components/ui/tabs';
import { ProfileForm } from '~features/profile/components/profilePage';

import { ProfileAddressList } from '~/features/profile-addresses/components/profileAddressList';

const ProfilePage = () => {
  const HEADER_TEXT = 'Profile page';
  const TABS = {
    ACCOUNT: 'Account',
    ADDRESSES: 'Addresses',
  };

  return (
    <>
      <h1 className={'heading-1 sr-only'}>{HEADER_TEXT}</h1>
      <Tabs defaultValue="account">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">{TABS.ACCOUNT}</TabsTrigger>
          <TabsTrigger value="addresses">{TABS.ADDRESSES}</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="addresses">
          <ProfileAddressList />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ProfilePage;
