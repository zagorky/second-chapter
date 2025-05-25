import type { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '~components/ui/button/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '~components/ui/form/form';
import { Input } from '~components/ui/input';
import { searchBarSchema } from '~features/search/types/schemas';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';

export const SearchBar = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const form = useForm<z.infer<typeof searchBarSchema>>({
    resolver: zodResolver(searchBarSchema),
    defaultValues: {
      search: '',
    },
  });

  function onSubmit(value: z.infer<typeof searchBarSchema>) {
    const newParameter = new URLSearchParams(searchParameters.toString());

    newParameter.set('search', value.search);
    setSearchParameters(newParameter);
  }

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
                <Input placeholder="Search..." {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-1/4">
          Search
        </Button>
      </form>
    </Form>
  );
};
