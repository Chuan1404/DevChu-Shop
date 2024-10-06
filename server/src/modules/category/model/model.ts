import { z } from "zod";

export enum CategoryStatus {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Deleted = "DELETED",
}

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  image: z.string().optional(),
  description: z.string().optional(),
  position: z.number().min(0, "invalid position").default(0),
  parent_id: z.string().optional(),
  status: z.nativeEnum(CategoryStatus),
  created_at: z.date(),
  updated_at: z.date(),
});

export type Category = z.infer<typeof CategorySchema>;
