import type { filterFormSchema } from '~features/filters/types/schemas';
import type { getPriceFilterData } from '~features/filters/utils/getPriceFilterData';
import type { z } from 'zod';

export type CategoryInfo = {
  id: string;
  name: string;
  count: number;
  parentId?: string;
  children: CategoryInfo[];
};

export type ConditionInfo = {
  id: string;
  count: number;
};

export type FilterFormValues = z.infer<typeof filterFormSchema>;

export type PriceFilterData = ReturnType<typeof getPriceFilterData>;
