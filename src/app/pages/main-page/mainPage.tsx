import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { Link } from 'react-router';

const MainPage = () => {
  return (
    <>
      <h1 className={'heading-1'}>Second Chapter Store</h1>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={navigationRoutes.about.path}>{navigationRoutes.about.title}</Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={navigationRoutes.catalog.path}>{navigationRoutes.catalog.title}</Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={navigationRoutes.cart.path}>{navigationRoutes.cart.title}</Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={navigationRoutes.login.path}>{navigationRoutes.login.title}</Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={navigationRoutes.signup.path}>{navigationRoutes.signup.title}</Link>
        </Button>
      </div>
    </>
  );
};

export default MainPage;
