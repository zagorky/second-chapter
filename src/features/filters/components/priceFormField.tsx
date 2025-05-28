import type { FilterFormValues } from '~features/filters/types/types';

import { Checkbox } from '~components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Slider } from '~components/ui/slider';
import { formatPrice } from '~features/fetch-products/utils/formatPrice';
import { useFormContext } from 'react-hook-form';

type PriceFilterProps = {
  prices: {
    discountProductsNumber: number;
    min: number;
    max: number;
  };
};

export const PriceFormField = ({ prices }: PriceFilterProps) => {
  const form = useFormContext<FilterFormValues>();
  const { discountProductsNumber, min, max } = prices;

  return (
    <FormField
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <div className="flex flex-col gap-4 md:flex-wrap lg:flex-row">
            <div className="justify-items-center lg:justify-items-start">
              <FormField
                control={form.control}
                name="sale"
                render={({ field: saleField }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={saleField.value} onCheckedChange={saleField.onChange} />
                    </FormControl>
                    <FormLabel className="cursor-pointer text-sm font-normal">
                      Sale ({discountProductsNumber})
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
            <div className="min-w-[150px] flex-1">
              <FormControl>
                <Slider
                  value={field.value}
                  onValueChange={field.onChange}
                  min={min}
                  max={max}
                  step={1}
                  minStepsBetweenThumbs={1}
                />
              </FormControl>
              <div className="mt-2 text-center text-sm">
                &pound;{formatPrice(field.value[0])} — &pound;{formatPrice(field.value[1])}
              </div>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
