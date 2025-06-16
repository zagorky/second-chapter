import { DiscountBanner } from '~features/discount-codes/components/DiscountBanner';
import { withDataTestId } from '~utils/helpers';

import { DISCOUNT_CODES } from '~/features/discount-codes/configs/discountCodesConfig';

const MainPage = () => {
  return (
    <>
      <h1 className={'heading-1'} {...withDataTestId('main-page-header')}>
        Second Chapter Store
      </h1>

      <div className="my-8 space-y-4">
        {DISCOUNT_CODES.map((code) => (
          <DiscountBanner key={code.id} discount={code} />
        ))}
      </div>
    </>
  );
};

export default MainPage;
