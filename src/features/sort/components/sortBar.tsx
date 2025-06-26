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
import { useSyncQueryParameters } from '~hooks/useSyncQueryParameters';
import { useSearchParams } from 'react-router';

export const SortBar = () => {
  const [searchParameters] = useSearchParams();
  const { updateURLParameters } = useSyncQueryParameters();
  const sortParameter = searchParameters.get('sort');

  const currentSortOption = sortParameter ? validateSortKey(sortParameter).shortKey : 'default';

  const handleSortChange = (value: string) => {
    updateURLParameters({ sort: value });
  };

  return (
    <div className="flex flex-1">
      <Select value={currentSortOption} onValueChange={handleSortChange}>
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
