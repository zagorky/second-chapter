import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { withDataTestId } from '~utils/helpers';
import { Link, useNavigate, useRouteError } from 'react-router';

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  const errorName = error instanceof Error ? error.name : '404: A Literary Dead End';
  const errorMessage = error instanceof Error ? error.message : 'the chapter was not found';

  return (
    <div className="m-auto flex h-[calc(100vh-200px)] max-w-xl flex-col items-center justify-center p-10">
      <h1 className={'heading-1'} {...withDataTestId('not-found-page-header')}>
        {errorName}
      </h1>
      <h2>{errorMessage}</h2>
      <div>
        <div className="m-auto max-w-xl py-5">
          <h3>Fear not, intrepid reader!</h3>
          <p>
            While this page may be as elusive as a first-edition Hemingway, our shelves are still brimming with
            treasures waiting to be discovered.
          </p>
        </div>
        {error instanceof Error ? (
          <Button
            variant="default"
            onClick={() => {
              void navigate(0);
            }}
            className="sm:inline-flex"
          >
            Try again
          </Button>
        ) : (
          <Button variant="default" className="sm:inline-flex" asChild>
            <Link to={navigationRoutes.main.path} className="flex items-center gap-2">
              <span className="sm:inline">Back to {navigationRoutes.main.title}</span>
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;
