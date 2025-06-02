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

export default function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative max-w-full overflow-hidden">
      <div className="border-border bg-secondary-background text-foreground font-base relative flex w-full overflow-x-hidden border-y-2">
        <div className="animate-marquee flex gap-2 pl-2 whitespace-nowrap">
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
        </div>

        <div className="animate-marquee2 absolute top-0 flex gap-2 pl-2 whitespace-nowrap">
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
          <MarqueeItems items={items} />
        </div>
      </div>
    </div>
  );
}
