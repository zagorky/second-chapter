import { Button } from '~components/ui/button/button';
import { FOOTER_HELP_ITEMS, FOOTER_NAVIGATION_ITEMS } from '~components/ui/footer/footerNavItems';
import { getCategoryLink } from '~components/ui/footer/getCategoryLink';
import { Input } from '~components/ui/input';
import { useCategoryData } from '~features/category/hooks/useCategoryData';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

export const Footer = () => {
  const { categories } = useCategoryData();

  return (
    <footer className="bg-background">
      <div
        id="store-info-block"
        className="max-w-screen-3xl mx-auto grid w-full grid-cols-1 gap-6 border-t px-4 py-6 sm:grid-cols-2 sm:gap-4 sm:px-6 sm:py-4 lg:grid-cols-4 lg:gap-8 lg:px-8"
      >
        <div className="flex flex-col justify-center text-center sm:text-left">
          <h2 className="text-2xl font-bold">Second Chapter</h2>
          <p>Rare & Pre-loved Books</p>
        </div>

        <address className="flex flex-col justify-center text-center not-italic sm:text-left">
          <p>42 Bookworm Lane</p>
          <p>London, WC2H 9HE</p>
        </address>

        <address className="flex flex-col justify-center text-center not-italic sm:text-left">
          <p>Mon-Sat: 10am-7pm</p>
          <p>Sun: 11am-5pm</p>
        </address>

        <address className="flex flex-col justify-center text-center not-italic sm:text-left">
          <a href="tel:+442071234567" className="hover:underline">
            +44 20 7123 4567
          </a>
        </address>
      </div>

      <div
        id="nav-block"
        className="max-w-screen-3xl mx-auto grid w-full grid-cols-1 gap-8 border-t px-4 py-8 sm:grid-cols-2 sm:gap-6 sm:px-6 sm:py-6 lg:grid-cols-4 lg:gap-8 lg:px-8"
      >
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <h4 className="text-lg font-semibold">General</h4>
          {FOOTER_NAVIGATION_ITEMS.map((item) => (
            <Link to={item.path} className="hover:underline" key={item.title}>
              {item.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3 text-center sm:text-left">
          <h4 className="text-lg font-semibold">Categories</h4>
          {categories.map((category) => (
            <Link className="capitalize hover:underline" key={category.name} to={getCategoryLink(category)}>
              {category.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3 text-center sm:text-left">
          <h4 className="text-lg font-semibold">Help</h4>
          {FOOTER_HELP_ITEMS.map((item) => (
            <Link to="/#" className="cursor-pointer hover:underline" key={item.title}>
              {item.title}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h4 className="mb-3 text-lg font-semibold">Stay Updated</h4>
          <p className="mb-4 text-center sm:text-left">Join our newsletter for rare finds:</p>
          <form className="flex w-full max-w-xs">
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
