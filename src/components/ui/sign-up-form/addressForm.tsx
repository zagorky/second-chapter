import { Input } from '~/components/ui/input';
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

export function AddressForm({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <h2>{props.title}</h2>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="address">Address</Label>
        </div>
        <Input id="address" type="text" placeholder="Abbey Road" required />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="сity">Сity</Label>
        </div>
        <Input id="сity" type="text" placeholder="London" required />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="postalCode">Postal Code</Label>
        </div>
        <Input id="postalCode" type="text" placeholder="NW8 9AY" required />
      </div>
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
