import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { Link } from 'react-router';

export const EmptyCartContent = () => {
  const TEXTS = {
    HEADING: 'No books in your cart yet',
    BUTTON_TEXT: 'Start exploring',
  } as const;

  return (
    <>
      <h2>{TEXTS.HEADING}</h2>
      <Link to={navigationRoutes.catalog.path}>
        <Button>{TEXTS.BUTTON_TEXT} </Button>
      </Link>
    </>
  );
};
