import type { ProductProjection } from '@commercetools/platform-sdk';
import type { FilterFormValues } from '~features/filters/types/types';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/ui/button/button';
import { Form } from '~components/ui/form/form';
import { ConditionsFormField } from '~features/filters/components/conditionsFormField';
import { GenresFormField } from '~features/filters/components/genresFormField';
import { filterFormSchema } from '~features/filters/types/schemas';
import { buildCategoriesMap, buildCategoriesTree } from '~features/filters/utils/buildCategories';
import { buildConditionsMap, buildConditionsTree } from '~features/filters/utils/buildConditions';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';

type CategoriesBarProps = {
  products: ProductProjection[];
};

export const FilterBar = ({ products }: CategoriesBarProps) => {
  const categories = buildCategoriesTree(buildCategoriesMap(products));
  const conditions = buildConditionsTree(buildConditionsMap(products));

  const [searchParameters, setSearchParameters] = useSearchParams();

  const form = useForm<FilterFormValues>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      genres: {
        category: searchParameters.get('category')?.split(',') ?? [],
        subcategory: searchParameters.get('subcategory')?.split(',') ?? [],
      },
      conditions: searchParameters.get('conditions')?.split(',') ?? [],
    },
  });

  const onApply = (values: FilterFormValues) => {
    const newParameter = new URLSearchParams(searchParameters.toString());

    if (values.genres.category.length > 0) {
      newParameter.set('category', values.genres.category.join(','));
    }
    if (values.genres.subcategory.length > 0) {
      newParameter.set('subcategory', values.genres.subcategory.join(','));
    }
    if (values.conditions.length > 0) {
      newParameter.set('conditions', values.conditions.join(','));
    }

    setSearchParameters(newParameter);
  };

  const onReset = () => {
    const newParameter = new URLSearchParams(searchParameters.toString());

    newParameter.delete('category');
    newParameter.delete('subcategory');
    newParameter.delete('conditions');
    newParameter.delete('price');
    newParameter.delete('isSale');
    newParameter.delete('search');

    setSearchParameters(newParameter);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={(event) => void form.handleSubmit(onApply)(event)} className="space-y-8">
          <GenresFormField categories={categories} />
          <ConditionsFormField conditions={conditions} />
          <Button type="submit">Apply</Button>
          <Button type="reset" onClick={onReset}>
            Reset
          </Button>
        </form>
      </Form>
    </div>
  );
};
