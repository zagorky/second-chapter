import type { filterFormSchema } from '~features/filters/types/schemas';
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
