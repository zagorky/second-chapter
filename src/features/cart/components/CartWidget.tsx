import { Button } from '~components/ui/button/button';
import { navigationRoutes } from '~config/navigation';
import { useCart } from '~features/cart/hooks/useCart';
import { ShoppingCartIcon } from 'lucide-react';
import { Link } from 'react-router';

export const CartWidget = () => {
  const { cart } = useCart();
  const totalLineItemQuantity = cart?.totalLineItemQuantity ?? 0;
  const itemsLimit = 99;

  return (
    <Button variant="neutral" asChild>
      <Link className="relative" to={navigationRoutes.cart.path}>
        <ShoppingCartIcon size={35} />
        {totalLineItemQuantity > 0 && (
          <div className="bg-main absolute top-1 left-7 z-20 flex h-4 min-w-4 items-center justify-center rounded-full text-[10px] leading-none">
            {totalLineItemQuantity > itemsLimit ? '99+' : totalLineItemQuantity}
          </div>
        )}
      </Link>
    </Button>
  );
};
