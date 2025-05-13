import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { withDataTestId } from '~utils/helpers';
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <div className="flex flex-col">
      <h1 className={'heading-1'} {...withDataTestId('not-found-page-header')}>
        404: A Literary Dead End
      </h1>
      <h2>the chapter was not found</h2>
      <div>
        <div className="m-auto max-w-xl p-10">
          <h3>Fear not, intrepid reader!</h3>
          <p>
            While this page may be as elusive as a first-edition Hemingway, our shelves are still brimming with
            treasures waiting to be discovered.
          </p>
        </div>
        <Button variant="outline" className="sm:inline-flex" asChild>
          <Link to={navigationRoutes.main.path} className="flex items-center gap-2">
            <span className="sm:inline">{navigationRoutes.main.title}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
