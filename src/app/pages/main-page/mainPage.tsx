import { HeroSection } from '~components/ui/hero-section/heroSection';
import { DiscountCarousel } from '~features/discount-codes/components/DiscountCarousel';

const MainPage = () => {
  return (
    <div className="space-y-12">
      <HeroSection />

      <section>
        <DiscountCarousel />
      </section>
    </div>
  );
};

export default MainPage;
