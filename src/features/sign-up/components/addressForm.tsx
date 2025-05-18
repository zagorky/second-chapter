import { AddressField } from '~components/ui/form-fields/addressField';

import { CityField } from '~/components/ui/form-fields/cityField';
import { PostalCodeField } from '~/components/ui/form-fields/postalcodeFields';
import { Label } from '~/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { cn } from '~/lib/utilities';

type AddressFormProps = React.ComponentProps<'div'> & {
  addressPrefix?: string;
  cityPrefix?: string;
  postalCodePrefix?: string;
  title?: string;
};

export function AddressForm({
  className,
  addressPrefix = '',
  cityPrefix = '',
  postalCodePrefix = '',
  ...props
}: AddressFormProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <h2>{props.title}</h2>
      <AddressField name={addressPrefix} />

      <CityField name={cityPrefix} />

      <PostalCodeField name={postalCodePrefix} />
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="country">Country</Label>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="UK" />
          </SelectTrigger>
          <SelectContent className="bg-primary">
            <SelectGroup>
              <SelectLabel>Available Countries</SelectLabel>
              <SelectItem value="UK">United Kingdom</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
