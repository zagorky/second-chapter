import type { TermFacetResult } from '@commercetools/platform-sdk';
import type { FilterFormValues } from '~features/filters/types/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/ui/button/button';
import { Form } from '~components/ui/form/form';
import { ConditionsFormField } from '~features/filters/components/conditionsFormField';
import { PriceFormField } from '~features/filters/components/priceFormField';
import { filterFormSchema } from '~features/filters/types/schemas';
import { getPriceFilterDataFromFacets } from '~features/filters/utils/getPriceFilterData';
import { useFormValuesChange } from '~hooks/useFormValuesChange';
import { isString, withDataTestId } from '~utils/helpers';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';

type FilterBarProps = {
  conditions: TermFacetResult;
  price: TermFacetResult;
};

export const FilterBar = ({ conditions, price }: FilterBarProps) => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const conditionsData = conditions.terms.map((term) => ({
    id: isString(term.term) ? term.term : '',
    label: isString(term.term) ? term.term : '',
  }));

  const priceRange = getPriceFilterDataFromFacets(price);
  const prices = {
    min: priceRange.minPrice,
    max: priceRange.maxPrice,
  };

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      conditions: searchParameters.get('conditions')?.split(',') ?? [],
      price: searchParameters.get('price')?.split('-').map(Number) ?? [priceRange.minPrice, priceRange.maxPrice],
      sale: searchParameters.get('sale') === 'true',
    },
  });

  useEffect(() => {
    const hasFilters = ['conditions', 'price', 'sale'].some((parameter) => searchParameters.has(parameter));

    if (hasFilters) {
      form.reset({
        conditions: searchParameters.get('conditions')?.split(',') ?? [],
        price: searchParameters.get('price')?.split('-').map(Number) ?? [prices.min, prices.max],
        sale: searchParameters.get('sale') === 'true',
      });
    } else {
      form.reset({
        conditions: [],
        price: [prices.min, prices.max],
        sale: false,
      });
    }
  }, [searchParameters]);

  useFormValuesChange(form, ({ values }) => {
    const newParameters = new URLSearchParams(searchParameters.toString());

    if (values.conditions && values.conditions.length > 0) {
      newParameters.set('conditions', values.conditions.join(','));
    } else {
      newParameters.delete('conditions');
    }

    if (values.sale) {
      newParameters.set('sale', 'true');
    } else {
      newParameters.delete('sale');
    }

    if (values.price && (values.price[0] !== prices.min || values.price[1] !== prices.max)) {
      newParameters.set('price', values.price.join('-'));
    } else {
      newParameters.delete('price');
    }

    setSearchParameters(newParameters);
  });

  const onReset = () => {
    const newParameter = new URLSearchParams(searchParameters.toString());

    newParameter.delete('conditions');
    newParameter.delete('sale');
    newParameter.delete('price');

    setSearchParameters(newParameter);
    form.reset({
      conditions: [],
      price: [prices.min, prices.max],
      sale: false,
    });
  };

  return (
    <div>
      <Form {...form} {...withDataTestId('filter-bar-form')}>
        <form className="border-border rounded-base grid items-start gap-4 border-2 p-6 sm:grid-cols-2 lg:grid-cols-1">
          <ConditionsFormField conditions={conditionsData} />
          <PriceFormField prices={prices} />
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
