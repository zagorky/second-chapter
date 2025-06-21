import { HeroSection } from '~components/ui/hero-section/heroSection';
import { DiscountCarousel } from '~features/discount-codes/components/DiscountCarousel';

import { DISCOUNT_CODES } from '~/features/discount-codes/configs/discountCodesConfig';

const MainPage = () => {
  return (
    <div className="space-y-12">
      <HeroSection />

      <section>
        <DiscountCarousel discounts={DISCOUNT_CODES} />
      </section>
    </div>
  );
};

export default MainPage;
