import { z } from "zod";

export const PagingDTOSchema = z.object({
  limit: z.coerce.number().int().min(1).default(1),
  page: z.coerce.number().int().min(1).default(1),
});

export type PagingDTO = z.infer<typeof PagingDTOSchema>;
