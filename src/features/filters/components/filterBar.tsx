import type { TermFacetResult } from '@commercetools/platform-sdk';
import type { FilterFormValues } from '~features/filters/types/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/ui/button/button';
import { Form } from '~components/ui/form/form';
import { ConditionsFormField } from '~features/filters/components/conditionsFormField';
import { PriceFormField } from '~features/filters/components/priceFormField';
import { filterFormSchema } from '~features/filters/types/schemas';
import { getPriceFilterDataFromFacets } from '~features/filters/utils/getPriceFilterData';
import { isString } from '~utils/helpers';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';

type FilterBarProps = {
  conditions: TermFacetResult;
  sale: TermFacetResult;
  price: TermFacetResult;
};

export const FilterBar = ({ conditions, sale, price }: FilterBarProps) => {
  const conditionsData = conditions.terms.map((term) => ({
    id: isString(term.term) ? term.term : '',
    label: isString(term.term) ? term.term : '',
    count: term.count,
  }));

  const saleCount = sale.total;

  const priceRange = getPriceFilterDataFromFacets(price);
  const prices = {
    min: priceRange.minPrice,
    max: priceRange.maxPrice,
    discountProductsNumber: saleCount,
  };
  const [searchParameters, setSearchParameters] = useSearchParams();

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      conditions: searchParameters.get('conditions')?.split(',') ?? [],
      price: searchParameters.get('price')?.split('-').map(Number) ?? [priceRange.minPrice, priceRange.maxPrice],
      sale: searchParameters.get('sale') === 'true',
    },
  });

  const onApply = (values: FilterFormValues) => {
    const newParameter = new URLSearchParams(searchParameters.toString());

    if (values.conditions.length > 0) {
      newParameter.set('conditions', values.conditions.join(','));
    }
    if (values.sale) {
      newParameter.set('sale', 'true');
    }

    if (values.price[0] !== prices.min || values.price[1] !== prices.max) {
      newParameter.set('price', values.price.join('-'));
    }
    setSearchParameters(newParameter);
  };

  const onReset = () => {
    const newParameter = new URLSearchParams();

    setSearchParameters(newParameter);
    form.reset();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(onApply)(event)} className="space-y-8">
          <ConditionsFormField conditions={conditionsData} />
          <PriceFormField prices={prices} />
          <Button type="submit">Apply</Button>
          <Button type="reset" onClick={onReset}>
            Reset
          </Button>
        </form>
      </Form>
    </div>
  );
};
