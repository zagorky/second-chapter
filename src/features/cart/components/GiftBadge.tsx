import Star9 from '~components/stars/s9';

export const GiftBadge = () => {
  return (
    <div className="relative">
      <Star9
        className="absolute top-0 -right-2 animate-bounce"
        color={'var(--color-chart-2)'}
        size={30}
        strokeWidth={2}
        stroke={'var(--color-border)'}
      />
      <Star9
        className="absolute right-6 bottom-2 animate-bounce"
        color={'var(--color-chart-2)'}
        size={22}
        strokeWidth={2}
        stroke={'var(--color-border)'}
      />

      <img src={'/gift.svg'} alt="" width={70} height={70} />
    </div>
  );
};
