import { DiscountCarousel } from '~features/discount-codes/components/DiscountCarousel';
import { withDataTestId } from '~utils/helpers';

import { DISCOUNT_CODES } from '~/features/discount-codes/configs/discountCodesConfig';

const MainPage = () => {
  return (
    <>
      <h1 className={'heading-1'} {...withDataTestId('main-page-header')}>
        Second Chapter Store
      </h1>

      <div className="my-8">
        <DiscountCarousel discounts={DISCOUNT_CODES} />
      </div>
    </>
  );
};

export default MainPage;
