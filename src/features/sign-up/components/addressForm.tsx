import type { Control, FieldValues, Path } from 'react-hook-form';

import { FixedFormErrorMessage } from '~components/ui/fixedFormErrorMessage';
import { Controller } from 'react-hook-form';

import { CityField } from '~/components/ui/form-fields/cityField';
import { PostalCodeField } from '~/components/ui/form-fields/postalcodeFields';
import { StreetField } from '~/components/ui/form-fields/streetField';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { cn } from '~/lib/utilities';

type AddressFormProps<T extends FieldValues> = React.ComponentProps<'div'> & {
  streetPrefix: Path<T>;
  cityPrefix: Path<T>;
  postalCodePrefix: Path<T>;
  countryPrefix: Path<T>;
  title: string;
  control: Control<T>;
};

export function AddressForm<T extends FieldValues>({
  className,
  streetPrefix,
  cityPrefix,
  postalCodePrefix,
  countryPrefix,
  control,
  ...props
}: AddressFormProps<T>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <h2>{props.title}</h2>
      <StreetField name={streetPrefix} />
      <CityField name={cityPrefix} />
      <PostalCodeField name={postalCodePrefix} />

      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="country">Country</Label>
        </div>
        <Controller
          control={control}
          name={countryPrefix}
          render={({ field, fieldState }) => (
            <>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="text-foreground w-[180px]">
                  <SelectValue placeholder="Choose a country">
                    {field.value === 'GB' ? 'United Kingdom' : field.value || ''}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectGroup>
                    <SelectItem value="GB">United Kingdom</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FixedFormErrorMessage>{fieldState.error ? fieldState.error.message : ''}</FixedFormErrorMessage>{' '}
            </>
          )}
        />
      </div>
    </div>
  );
}
