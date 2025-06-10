import { Button } from '~components/ui/button/button';
import { Image } from '~components/ui/image';
import { navigationRoutes } from '~config/navigation';
import { Link } from 'react-router';

export const EmptyCartContent = () => {
  const TEXTS = {
    HEADING: 'No books in your cart yet',
    BUTTON_TEXT: 'Start exploring',
  } as const;

  return (
    <div className="grid gap-7">
      <h2>{TEXTS.HEADING}</h2>
      <Image src="/suspicious-magnifying-glass.svg" alt="Suspicious emoji looking at a magnifying glass" size={150} />
      <Link to={navigationRoutes.catalog.path}>
        <Button>{TEXTS.BUTTON_TEXT} </Button>
      </Link>
    </div>
  );
};
