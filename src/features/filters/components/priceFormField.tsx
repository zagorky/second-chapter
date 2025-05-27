import type { FilterFormValues, PriceFilterData } from '~features/filters/types/types';

import { Checkbox } from '~components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Slider } from '~components/ui/slider';
import { formatPrice } from '~features/fetch-products/utils/formatPrice';
import { useFormContext } from 'react-hook-form';

type PriceFilterProps = {
  prices: PriceFilterData;
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
          <div className="space-y-2">
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
            &pound;{formatPrice(field.value[0])} — &pound;{formatPrice(field.value[1])}
            <FormField
              control={form.control}
              name="sale"
              render={({ field: saleField }) => (
                <FormItem className="flex items-center space-x-2 py-2">
                  <FormControl>
                    <Checkbox checked={saleField.value} onCheckedChange={saleField.onChange} />
                  </FormControl>
                  <FormLabel className="cursor-pointer text-sm font-normal">Sale ({discountProductsNumber})</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </FormItem>
      )}
    />
  );
};
