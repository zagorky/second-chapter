import { Checkbox } from '~components/ui/checkbox';
import { Slider } from '~components/ui/slider';

export const PriceFilter = () => {
  const TEMP_MAX_VALUE = 100;

  return (
    <div className="flex flex-1 flex-col gap-4 py-4">
      <h2>Price</h2>
      <Slider defaultValue={[0, TEMP_MAX_VALUE]} max={TEMP_MAX_VALUE} step={1} />
      <div className="flex w-full cursor-pointer items-center justify-start gap-4 p-2 text-sm">
        <Checkbox /> Sale ({5})
      </div>
    </div>
  );
};
