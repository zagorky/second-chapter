import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { useAppStore } from '~stores/store';
import { withDataTestId } from '~utils/helpers';
import { Link } from 'react-router';

const MainPage = () => {
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);
  const { signup, cart, catalog, about, login } = navigationRoutes;

  return (
    <>
      <h1 className={'heading-1'} {...withDataTestId('main-page-header')}>
        Second Chapter Store
      </h1>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={about.path}>{about.title}</Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={catalog.path}>{catalog.title}</Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={cart.path}>{cart.title}</Link>
        </Button>
        {!isAuthenticated && (
          <>
            <Button variant="outline" className="hidden sm:inline-flex" asChild>
              <Link to={login.path}>{login.title}</Link>
            </Button>
            <Button variant="outline" className="hidden sm:inline-flex" asChild>
              <Link to={signup.path}>{signup.title}</Link>
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
