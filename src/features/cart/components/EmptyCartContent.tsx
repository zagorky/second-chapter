import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { Link } from 'react-router';

export const EmptyCartContent = () => {
  const TEXTS = {
    HEADING: 'No books in your cart yet',
    BUTTON_TEXT: 'Start exploring',
  } as const;

  return (
    <div className="grid justify-center gap-7">
      <h2>{TEXTS.HEADING}</h2>
      <figure className="mx-auto h-[150px] w-[150px] overflow-hidden">
        <img className="w-full object-contain" src="/suspicious-magnifying-glass.svg" alt="description" />
      </figure>
      <Link to={navigationRoutes.catalog.path}>
        <Button>{TEXTS.BUTTON_TEXT} </Button>
      </Link>
    </div>
  );
};
