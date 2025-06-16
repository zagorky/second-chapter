import { navigationRoutes } from '~config/navigation';
import { useCart } from '~features/cart/hooks/useCart';
import { ShoppingCartIcon } from 'lucide-react';
import { Link } from 'react-router';

export const CartWidget = () => {
  const { cart } = useCart();
  const totalLineItemQuantity = cart?.totalLineItemQuantity ?? 0;

  return (
    <div>
      <Link className="relative" to={navigationRoutes.cart.path}>
        <ShoppingCartIcon className="w-10" />
        {totalLineItemQuantity > 0 && (
          <div className="bg-background absolute right-1 bottom-3 z-20 rounded-full px-1 text-[10px]">
            {totalLineItemQuantity}
          </div>
        )}
      </Link>
    </div>
  );
};
