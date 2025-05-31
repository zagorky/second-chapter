import { SORT_OPTIONS } from '~features/sort/config/constants';

export const validateSortKey = (key: string) => {
  const option = SORT_OPTIONS.find((opt) => opt.shortKey === key);

  return option ?? SORT_OPTIONS[0];
};
