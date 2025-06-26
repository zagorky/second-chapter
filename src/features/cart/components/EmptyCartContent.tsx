import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { Link } from 'react-router';

export const EmptyCartContent = () => {
  const TEXTS = {
    HEADING: 'No books in your cart yet',
    BUTTON_TEXT: 'Start exploring',
  } as const;

  return (
    <div className="flex flex-grow flex-col items-center justify-center gap-7">
      <h2>{TEXTS.HEADING}</h2>
      <img
        src="/discount-banners/pets-magnifying-glass.png"
        alt="Pets with magnifying glass"
        width={420}
        height={236}
        className="block max-w-[300px]"
      />
      <Link to={navigationRoutes.catalog.path}>
        <Button>{TEXTS.BUTTON_TEXT} </Button>
      </Link>
    </div>
  );
};
