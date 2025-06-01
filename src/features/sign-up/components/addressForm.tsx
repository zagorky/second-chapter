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
  readOnly?: boolean;
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
      <StreetField name={streetPrefix} readOnly={props.readOnly} />
      <CityField name={cityPrefix} readOnly={props.readOnly} />

      <PostalCodeField name={postalCodePrefix} readOnly={props.readOnly} />
      <div className="grid grow gap-3">
        <div className="flex items-center">
          <Label htmlFor="country">Country</Label>
        </div>
        <Controller
          control={control}
          name={countryPrefix}
          render={({ field, fieldState }) => (
            <>
              <Select value={field.value} onValueChange={props.readOnly ? undefined : field.onChange}>
                <SelectTrigger className={cn('w-[180px]', props.readOnly && 'pointer-events-none opacity-75')}>
                  <SelectValue placeholder="Choose a country">
                    {field.value === 'GB' ? 'United Kingdom' : field.value || ''}
                  </SelectValue>
                </SelectTrigger>
                {!props.readOnly && (
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="GB">United Kingdom</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                )}
              </Select>
              <FixedFormErrorMessage>{fieldState.error ? fieldState.error.message : ''}</FixedFormErrorMessage>
            </>
          )}
        />
      </div>
    </div>
  );
}
