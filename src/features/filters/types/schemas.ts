import { z } from 'zod';

export const filterFormSchema = z.object({
  conditions: z.array(z.string()),
  price: z.array(z.number()),
  sale: z.boolean(),
});
