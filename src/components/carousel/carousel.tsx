import type { EmblaCarouselType, EmblaEventType } from 'embla-carousel';

import { Button } from '~components/ui/button/button';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

import { cn } from '~/lib/utilities';

import { DotButton } from './dotButton';
import { useDotButton } from './useDotButton';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type BaseCarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselOptions = BaseCarouselOptions & {
  autoplay?: boolean | { delay?: number; stopOnInteraction?: boolean };
};

type CarouselProps = {
  options?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  plugins?: CarouselPlugin;
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.use(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const TWEEN_FACTOR_BASE = 0.9;
const SCALE = 0.3;
const TRANSITION_DURATION = 0.5;

const numberWithinRange = (number: number, min: number, max: number): number => Math.min(Math.max(number, min), max);

function Carousel({
  orientation = 'horizontal',
  options,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const autoplayPlugin = React.useMemo(() => {
    const autoplayConfig = options?.autoplay;

    if (!autoplayConfig) return;

    const DEFAULT_DELAY = 4000;

    if (typeof autoplayConfig === 'boolean') {
      return Autoplay({ delay: DEFAULT_DELAY, stopOnInteraction: false });
    }

    return Autoplay({
      delay: autoplayConfig.delay ?? DEFAULT_DELAY,
      stopOnInteraction: autoplayConfig.stopOnInteraction ?? true,
    });
  }, [options?.autoplay]);

  const allPlugins = React.useMemo(() => {
    const pluginArray = plugins ? (Array.isArray(plugins) ? plugins : [plugins]) : [];

    if (autoplayPlugin) {
      pluginArray.push(autoplayPlugin);
    }

    return pluginArray;
  }, [plugins, autoplayPlugin]);

  const [carouselReference, api] = useEmblaCarousel(
    {
      ...options,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    allPlugins
  );
  const [canScrollPrevious, setCanScrollPrevious] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const tweenFactor = React.useRef(0);
  const tweenNodes = React.useRef<HTMLElement[]>([]);

  const setTweenNodes = React.useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('[data-carousel-scale-target]') ?? slideNode;
    });
  }, []);

  const setTweenFactor = React.useCallback((emblaApi: EmblaCarouselType) => {
    const slideCount = emblaApi.scrollSnapList().length;

    tweenFactor.current = TWEEN_FACTOR_BASE * slideCount;
  }, []);

  const tweenScale = React.useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const scale = numberWithinRange(tweenValue, SCALE, 1).toString();
        const tweenNode = tweenNodes.current[slideIndex];

        tweenNode.style.transform = `scale(${scale})`;
        tweenNode.style.transition = isScrollEvent ? 'none' : `transform ${String(TRANSITION_DURATION)}s ease-out`;
      });
    });
  }, []);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrevious(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrevious = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const onNavButtonClick = React.useCallback((emblaApi: CarouselApi) => {
    if (!emblaApi) return;

    const autoplay = emblaApi.plugins().autoplay;

    const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api, onNavButtonClick);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrevious, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  React.useEffect(() => {
    if (!api) return;

    setTweenNodes(api);
    setTweenFactor(api);
    tweenScale(api);

    api
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale);
  }, [api, tweenScale, setTweenNodes, setTweenFactor]);

  const contextValue = React.useMemo(
    () => ({
      carouselRef: carouselReference,
      api: api,
      options,
      orientation,
      scrollPrev: scrollPrevious,
      scrollNext,
      canScrollPrev: canScrollPrevious,
      canScrollNext,
      selectedIndex,
      scrollSnaps,
      onDotButtonClick,
    }),
    [
      carouselReference,
      api,
      options,
      orientation,
      scrollPrevious,
      scrollNext,
      canScrollPrevious,
      canScrollNext,
      selectedIndex,
      scrollSnaps,
      onDotButtonClick,
    ]
  );

  return (
    <CarouselContext value={contextValue}>
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext>
  );
}

function CarouselContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden" data-slot="carousel-content">
      <div className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)} {...props} />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel();

  return (
    <div
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
      className={cn('min-w-0 shrink-0 grow-0 basis-full', orientation === 'horizontal' ? 'pl-4' : 'pt-4', className)}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = 'noShadow',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn('rounded-base size-8', className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = 'noShadow',
  size = 'icon',
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn('rounded-base h-8 w-8', className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}
function CarouselDots({ className, ...props }: React.ComponentProps<'div'>) {
  const { scrollSnaps, selectedIndex, onDotButtonClick } = useCarousel();

  return (
    <div data-slot="carousel-dots" className={cn('flex justify-center gap-2 p-2', className)} {...props}>
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={`carousel-dot-${String(index)}`}
          onClick={() => {
            onDotButtonClick(index);
          }}
          className={cn(index === selectedIndex ? 'bg-main' : 'bg-transparent')}
          aria-label={`Go to slide ${String(index + 1)}`}
        />
      ))}
    </div>
  );
}

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots };
