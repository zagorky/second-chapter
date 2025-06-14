import type { FilterFormValues } from '~features/filters/types/types';

import { Checkbox } from '~components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Slider } from '~components/ui/slider';
import { formatPrice } from '~features/fetch-products/utils/formatPrice';
import { useFacetsData } from '~features/filters/hooks/useFacetsData';
import { withDataTestId } from '~utils/helpers';
import { useDeferredValue, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export const PriceFormField = () => {
  const form = useFormContext<FilterFormValues>();
  const {
    price: { min, max },
  } = useFacetsData();

  const [selectedPriceRange, setSelectedPriceRange] = useState(form.getValues('price'));
  const formMinPrice = form.getValues('price')[0];
  const formMaxPrice = form.getValues('price')[1];

  const deferredPriceRange = useDeferredValue<number[]>(selectedPriceRange);

  useEffect(() => {
    setSelectedPriceRange([formMinPrice, formMaxPrice]);
  }, [formMinPrice, formMaxPrice]);

  return (
    <FormField
      {...withDataTestId('price-form-field')}
      control={form.control}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-md">Price</FormLabel>
          <div className="grid gap-2 md:flex-wrap lg:flex-row">
            <div className="mt-1 min-w-[150px]">
              <FormControl>
                <Slider
                  value={selectedPriceRange}
                  onValueChange={setSelectedPriceRange}
                  onValueCommit={() => {
                    field.onChange(deferredPriceRange);
                  }}
                  min={min}
                  max={max}
                  step={1}
                  minStepsBetweenThumbs={1}
                />
              </FormControl>
              <div className="mt-2 text-center text-sm">
                {formatPrice(selectedPriceRange[0])} — {formatPrice(selectedPriceRange[1])}
              </div>
            </div>
            <div className="lg:justify-items-start">
              <FormField
                control={form.control}
                name="sale"
                render={({ field: saleField }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={saleField.value} onCheckedChange={saleField.onChange} />
                    </FormControl>
                    <FormLabel className="cursor-pointer text-sm font-normal">Sale</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
