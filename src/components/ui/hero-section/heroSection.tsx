import type { CategoryNode } from '~features/category/utils/buildCategories';

import { AnimatedWord } from '~components/ui/animated-word/animatedWord';
import { useCategoryData } from '~features/category/hooks/useCategoryData';
import { withDataTestId } from '~utils/helpers';
import { useNavigate } from 'react-router';

import Star17 from '~/components/stars/s17';
import { Button } from '~/components/ui/button/button';
import { navigationRoutes } from '~/config/navigation';
import { cn } from '~/lib/utilities';

export const HeroSection = () => {
  const { categories } = useCategoryData();
  const navigate = useNavigate();

  const getAllCategoryNames = (categories: CategoryNode[]): string[] => {
    return categories.reduce<string[]>((names, category) => {
      names.push(category.name);
      if (category.children.length > 0) {
        names.push(...getAllCategoryNames(category.children));
      }

      return names;
    }, []);
  };

  const categoryNames = getAllCategoryNames(categories);
  const displayWords = categoryNames.length > 0 ? categoryNames : ['Store', 'Shop', 'Market', 'Library'];

  return (
    <section className="relative flex flex-col-reverse gap-1 bg-contain bg-right bg-no-repeat px-6 text-left lg:grid lg:grid-cols-[2fr_1fr] lg:py-6">
      <div className="space-y-6">
        <div className="text-left">
          <h1
            className={cn('', 'block max-w-2xl text-6xl font-bold uppercase')}
            {...withDataTestId('main-page-header')}
          >
            Second Chapter books
          </h1>

          <AnimatedWord words={displayWords} className="text-2xl font-bold uppercase sm:text-6xl" />
        </div>

        <p className="block max-w-60 text-left text-2xl">Old books, fresh&nbsp;experience</p>
        <Button className="mr-auto" size="lg" onClick={() => void navigate(navigationRoutes.catalog.path)}>
          Start exploring
        </Button>
      </div>
      <div className="relative flex max-w-[200px] flex-col items-end pt-[50px] sm:max-w-[300px] sm:pt-[100px]">
        <Star17
          size={100}
          color="var(--color-chart-1"
          stroke="var(--color-border)"
          strokeWidth={2}
          className="absolute top-0 right-0 w-[50px] animate-[spin_10s_linear_infinite] sm:w-[100px]"
        />
        <img src="/hero-team.png" alt="Hero Section" className="" />
      </div>
    </section>
  );
};
