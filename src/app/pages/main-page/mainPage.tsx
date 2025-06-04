import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { withDataTestId } from '~utils/helpers';
import { Link } from 'react-router';

const MainPage = () => {
  const { signup, cart, catalog, about, login } = navigationRoutes;

  return (
    <>
      <h1 className={'heading-1'} {...withDataTestId('main-page-header')}>
        Second Chapter Store
      </h1>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button variant="default" className="inline-flex" asChild>
          <Link to={about.path}>{about.title}</Link>
        </Button>
        <Button variant="default" className="inline-flex" asChild>
          <Link to={catalog.path}>{catalog.title}</Link>
        </Button>
        <Button variant="default" className="inline-flex" asChild>
          <Link to={cart.path}>{cart.title}</Link>
        </Button>
        <Button variant="default" className="inline-flex" asChild>
          <Link to={login.path}>{login.title}</Link>
        </Button>
        <Button variant="default" className="inline-flex" asChild>
          <Link to={signup.path}>{signup.title}</Link>
        </Button>
      </div>
    </>
  );
};

export default MainPage;
