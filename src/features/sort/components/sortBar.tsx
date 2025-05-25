import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~components/ui/select';
import { SORT_OPTIONS } from '~features/sort/config/constants';
import { validateSortKey } from '~features/sort/utils/validateSortKey';
import { useSearchParams } from 'react-router';

export const SortBar = () => {
  const [searchParameters, setSearchParameters] = useSearchParams();

  const handleSortChange = (value: string) => {
    const newParameter = new URLSearchParams(searchParameters.toString());

    newParameter.set('sort', validateSortKey(value).shortKey);
    setSearchParameters(newParameter);
  };

  return (
    <div className="flex flex-1">
      <Select onValueChange={handleSortChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by...</SelectLabel>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.shortKey} value={option.shortKey}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
