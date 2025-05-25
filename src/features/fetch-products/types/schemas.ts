import { z } from 'zod';

export const searchBarSchema = z.object({
  search: z.string(),
});

export const SortSchema = z.object({
  shortKey: z.enum(['price-asc', 'price-desc', 'name-asc', 'name-desc']),
  commercetoolsParameter: z.string(),
  label: z.string(),
  requiresCurrency: z.boolean(),
});
