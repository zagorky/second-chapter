import type { FilterFormValues } from '~features/filters/types/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/ui/button/button';
import { Form } from '~components/ui/form/form';
import { ConditionsFormField } from '~features/filters/components/conditionsFormField';
import { PriceFormField } from '~features/filters/components/priceFormField';
import { useFacetsData } from '~features/filters/hooks/useFacetsData';
import { filterFormSchema } from '~features/filters/types/schemas';
import { useSyncQueryParameters } from '~features/pagination/hooks/useSyncQueryParameters';
import { useFormValuesChange } from '~hooks/useFormValuesChange';
import { withDataTestId } from '~utils/helpers';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';

export const FilterBar = () => {
  const [searchParameters] = useSearchParams();
  const { updateURLParameters, removeURLParameters } = useSyncQueryParameters();
  const { price } = useFacetsData();

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      conditions: searchParameters.get('conditions')?.split(',') ?? [],
      price: searchParameters.get('price')?.split('-').map(Number) ?? [price.min, price.max],
      sale: searchParameters.get('sale') === 'true',
    },
  });

  useEffect(() => {
    const hasFilters = ['conditions', 'price', 'sale'].some((parameter) => searchParameters.has(parameter));

    if (hasFilters) {
      form.reset({
        conditions: searchParameters.get('conditions')?.split(',') ?? [],
        price: searchParameters.get('price')?.split('-').map(Number) ?? [price.min, price.max],
        sale: searchParameters.get('sale') === 'true',
      });
    } else {
      form.reset({
        conditions: [],
        price: [price.min, price.max],
        sale: false,
      });
    }
  }, [form, price.max, price.min, searchParameters]);

  useFormValuesChange(form, ({ values }) => {
    if (values.conditions && values.price) {
      updateURLParameters({
        conditions: values.conditions.filter((c): c is string => !!c),
        price: { priceRange: values.price.filter((c): c is number => !!c), min: price.min, max: price.max },
        sale: values.sale,
      });
    }
  });

  const onReset = () => {
    removeURLParameters(['conditions', 'sale', 'price']);

    form.reset({
      conditions: [],
      price: [price.min, price.max],
      sale: false,
    });
  };

  return (
    <div>
      <Form {...form} {...withDataTestId('filter-bar-form')}>
        <form className="border-border rounded-base grid items-start gap-4 border-2 p-6 sm:grid-cols-2 lg:grid-cols-1">
          <ConditionsFormField />
          <PriceFormField />
          <div className="flex justify-end gap-4 sm:col-span-2 lg:col-span-1">
            <Button {...withDataTestId('reset-button')} type="button" onClick={onReset}>
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
