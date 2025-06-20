import type { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/ui/button/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Input } from '~components/ui/input';
import { searchBarSchema } from '~features/search/types/schemas';
import { useSyncQueryParameters } from '~hooks/useSyncQueryParameters';
import { Search, XIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';

export const SearchBar = () => {
  const [searchParameters] = useSearchParams();
  const { updateURLParameters, removeURLParameters } = useSyncQueryParameters();
  const searchQuery = searchParameters.get('search') ?? '';

  const form = useForm<z.infer<typeof searchBarSchema>>({
    resolver: zodResolver(searchBarSchema),
    defaultValues: {
      search: searchQuery,
    },
  });

  function onSubmit(value: z.infer<typeof searchBarSchema>) {
    updateURLParameters({ search: value.search });
  }

  const onReset = () => {
    removeURLParameters(['search']);
    form.reset({ search: '' });
  };

  return (
    <Form {...form}>
      <form onSubmit={(event) => void form.handleSubmit(onSubmit)(event)} className="flex w-full flex-2 gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Search</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Search..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">
          <Search />
        </Button>
        <Button type="reset" onClick={onReset}>
          <XIcon />
        </Button>
      </form>
    </Form>
  );
};
