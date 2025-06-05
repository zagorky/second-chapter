import { Button } from '~components/ui/button/button';
import { FOOTER_HELP_ITEMS, FOOTER_NAVIGATION_ITEMS } from '~components/ui/footer/footerNavItems';
import { getCategoryLink } from '~components/ui/footer/getCategoryLink';
import { Input } from '~components/ui/input';
import Marquee from '~components/ui/marquee';
import { useCategoryData } from '~features/category/hooks/useCategoryData';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export const Footer = () => {
  const { categories } = useCategoryData();

  return (
    <footer className="bg-background border-t">
      <div
        id="store-info-block"
        className="wrapper max-w-screen-3xl mx-auto grid w-full grid-cols-2 gap-4 gap-6 px-4 py-6 sm:gap-4 sm:px-6 sm:py-4 lg:grid-cols-4 lg:gap-8 lg:px-8"
      >
        <div className="flex flex-col justify-center text-left">
          <h2 className="sm:text-2x text-lg font-bold">Second Chapter</h2>
          <p className="footer-text-content">Rare & Pre-loved Books</p>
        </div>

        <address className="footer-text-content">
          <p>42 Bookworm Lane</p>
          <p>London, WC2H 9HE</p>
        </address>

        <address className="footer-text-content">
          <p>Mon-Sat: 10am-7pm</p>
          <p>Sun: 11am-5pm</p>
        </address>

        <address className="footer-text-content">
          <a href="tel:+442071234567" className="hover:underline">
            +44 20 7123 4567
          </a>
        </address>
      </div>

      <div id="store-name-marquee" className="overflow-hidden">
        <Marquee items={['Second Chapter Store', 'Rare & Pre-loved Books']} />
      </div>

      <div
        id="nav-block"
        className="wrapper max-w-screen-3xl mx-auto grid w-full grid-cols-2 gap-8 px-4 py-8 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-4 lg:gap-8 lg:px-8"
      >
        <div className="flex flex-col gap-3">
          <h4 className="text-lg font-semibold">General</h4>
          {FOOTER_NAVIGATION_ITEMS.map((item) => (
            <Link to={item.path} className="footer-text-content hover:underline" key={item.title}>
              {item.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-lg">Categories</h4>
          {categories.map((category) => (
            <Link
              className="footer-text-content capitalize hover:underline"
              key={category.name}
              to={getCategoryLink(category)}
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-lg">Help</h4>
          {FOOTER_HELP_ITEMS.map((item) => (
            <Link to="/#" className="footer-text-content cursor-pointer hover:underline" key={item.title}>
              {item.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col">
          <h4 className="mb-3 text-lg">Stay Updated</h4>
          <p className="footer-text-content mb-4">Join our newsletter for rare finds:</p>
          <form className="flex w-full max-w-xs gap-2">
            <Input type="text" placeholder="Your email" className="rounded-base flex-grow border px-3 py-2" />
            <Button type="button" className="px-4 py-2">
              <ArrowRight />
            </Button>
          </form>
        </div>
      </div>
    </footer>
  );
};
