import type { SortSchema } from '~features/sort/types/schemas';
import type { z } from 'zod';

export type SortOption = z.infer<typeof SortSchema>;
