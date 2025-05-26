import { Slider } from '~components/ui/slider';

export const PriceFilter = () => {
  return (
    <div>
      <h2>Price</h2>
      <Slider defaultValue={[0, 100]} max={100} step={1} />
    </div>
  );
};
