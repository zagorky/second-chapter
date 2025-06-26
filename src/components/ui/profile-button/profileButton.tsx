import { navigationRoutes } from '~config/navigation';
import { User } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '~/components/ui/button/button';

export const ProfileButton = () => {
  return (
    <Button variant="neutral" className="sm:inline-flex" asChild>
      <Link to={navigationRoutes.profile.path} className="flex items-center gap-2">
        <User className="size-4" />
      </Link>
    </Button>
  );
};
