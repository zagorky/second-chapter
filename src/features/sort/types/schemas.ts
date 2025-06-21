import { z } from 'zod';

export const SortSchema = z.object({
  shortKey: z.enum(['price-asc', 'price-desc', 'name-asc', 'name-desc', 'default']),
  commercetoolsParameter: z.string(),
  label: z.string(),
  requiresCurrency: z.boolean(),
});
