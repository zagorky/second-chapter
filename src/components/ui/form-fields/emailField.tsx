import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '~components/ui/form';
import { Input } from '~components/ui/input';
import { useFormContext } from 'react-hook-form';

export const EmailField = ({ name = 'email' }: { name?: string }) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="grid gap-3">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="user@example.com" {...field} type="text" />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
