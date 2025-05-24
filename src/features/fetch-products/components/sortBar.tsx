import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~components/ui/select';

type SortBarProps = {
  onSortChange: (value: string) => void;
};

export const SortBar = ({ onSortChange }: SortBarProps) => {
  return (
    <div className="flex flex-1">
      <Select onValueChange={onSortChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by...</SelectLabel>
            <SelectItem value="price asc">Price (Low to High)</SelectItem>
            <SelectItem value="price desc">Price (High to Low)</SelectItem>
            <SelectItem value="name.en asc">Name (A-Z)</SelectItem>
            <SelectItem value="name.en desc">Name (Z-A)</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
