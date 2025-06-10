import { CartContent } from '~features/cart/components/CartContent';

const CartPage = ({ title }: { title: string }) => {
  return (
    <>
      <h1 className={'heading-1 sr-only'}>{title}</h1>
      <CartContent />
    </>
  );
};

export default CartPage;
