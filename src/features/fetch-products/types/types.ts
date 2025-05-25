import type { SortSchema } from '~features/fetch-products/types/schemas';
import type { z } from 'zod';

export type SortOption = z.infer<typeof SortSchema>;
