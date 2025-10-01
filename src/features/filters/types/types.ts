import type { filterFormSchema } from '~features/filters/types/schemas';
import type { z } from 'zod';

export type FilterFormValues = z.infer<typeof filterFormSchema>;
