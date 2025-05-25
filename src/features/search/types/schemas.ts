import { z } from 'zod';

export const searchBarSchema = z.object({
  search: z.string(),
});
