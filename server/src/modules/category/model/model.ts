import { z } from "zod";
import { ModelStatus } from "../../../share/model/baseModel";


export const CategorySchema = z.object({
  id: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters"),
  image: z.string().optional(),
  description: z.string().optional(),
  position: z.number().min(0, "invalid position").default(0),
  parentId: z.string().optional(),
  status: z.nativeEnum(ModelStatus),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Category = z.infer<typeof CategorySchema>;
