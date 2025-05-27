import { z } from 'zod';

export const filterFormSchema = z.object({
  genres: z.object({
    category: z.array(z.string()),
    subcategory: z.array(z.string()),
  }),
  conditions: z.array(z.string()),
  price: z.array(z.number()),
  sale: z.boolean(),
});
