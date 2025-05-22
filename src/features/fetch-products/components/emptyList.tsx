import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { withDataTestId } from '~utils/helpers';
import { Link } from 'react-router';

export const EmptyList = () => {
  return (
    <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center" {...withDataTestId('empty-list')}>
      <div className="m-auto max-w-xl p-10">
        <h3>Fear not, intrepid reader!</h3>
        <p>
          Our shelves are currently empty. We&#39;re working to restock our collection of pre-loved books. Try
          refreshing the page or visit us again soon!
        </p>
      </div>
      <Button variant="default" className="sm:inline-flex" asChild>
        <Link to={navigationRoutes.main.path} className="flex items-center gap-2">
          <span className="sm:inline">Back to {navigationRoutes.main.title}</span>
        </Link>
      </Button>
    </div>
  );
};
