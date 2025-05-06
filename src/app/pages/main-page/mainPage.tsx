import { Button } from '~components/ui/button/button.tsx';
import { NAVIGATION_ROUTES } from '~config/navigation.ts';
import { Link } from 'react-router';

const MainPage = () => {
  document.title = 'Second Chapter Store | Main';

  return (
    <>
      <h1 className={'heading-1'}>Second Chapter Store</h1>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={NAVIGATION_ROUTES.about}>About us</Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={NAVIGATION_ROUTES.catalog}>Catalog</Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={NAVIGATION_ROUTES.cart}>Cart</Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={NAVIGATION_ROUTES.signin}>Sign In</Link>
        </Button>
        <Button variant="outline" className="hidden sm:inline-flex" asChild>
          <Link to={NAVIGATION_ROUTES.signup}>Sign Up</Link>
        </Button>
      </div>
    </>
  );
};

export default MainPage;
