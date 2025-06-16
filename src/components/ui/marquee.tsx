import Star17 from '../stars/s17';

const MarqueeItems = ({ items }: { items: string[] }) => (
  <>
    {items.map((item, index) => (
      <div key={`${item}-${String(index)}`} className="flex items-center gap-2 text-2xl">
        <div>{item}</div>
        <div>
          <Star17 size={24} color="var(--color-main)" stroke="var(--color-border)" strokeWidth={10} />
        </div>
      </div>
    ))}
  </>
);

const SPEED_PIXELS_PER_SECOND = 70;

const setupMarquee = (container: HTMLDivElement, content: HTMLDivElement) => {
  const updateDuration = () => {
    const contentWidth = content.scrollWidth;
    const duration = contentWidth / SPEED_PIXELS_PER_SECOND;

    container.style.setProperty('--marquee-duration', `${String(duration)}s`);
  };

  updateDuration();

  const resizeObserver = new ResizeObserver(updateDuration);

  resizeObserver.observe(container);
};

export default function Marquee({ items }: { items: string[] }) {
  let containerElement: HTMLDivElement | null = null;
  let contentElement: HTMLDivElement | null = null;

  const setContainer = (element: HTMLDivElement | null) => {
    containerElement = element;
    if (containerElement && contentElement) {
      setupMarquee(containerElement, contentElement);
    }
  };

  const setContent = (element: HTMLDivElement | null) => {
    contentElement = element;
    if (containerElement && contentElement) {
      setupMarquee(containerElement, contentElement);
    }
  };

  return (
    <div ref={setContainer} className="relative max-w-full overflow-hidden">
      <div className="border-border bg-secondary-background text-foreground font-base relative flex w-full overflow-x-hidden border-y-2">
        <div ref={setContent} className="animate-marquee-dynamic flex gap-2 pl-2 whitespace-nowrap">
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
        </div>

        <div className="animate-marquee2-dynamic absolute top-0 flex gap-2 pl-2 whitespace-nowrap">
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
        </div>
      </div>
    </div>
  );
}
