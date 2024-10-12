import { z } from "zod";
import { ModelStatus } from "../../../share/model/baseModel";

export const CategoryCreateSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  image: z.string().optional(),
  description: z.string().optional(),
  parent_id: z.string().optional(),
});

export const CategoryUpdateSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  image: z.string().optional(),
  description: z
    .string()
    .max(255, "descriptions must be at most 255 characters")
    .optional(),
  parent_id: z.string().optional(),
  status: z.nativeEnum(ModelStatus).optional(),
});

export const CategoryCondDTOScheme = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  parent_id: z.string().optional(),
  status: z.nativeEnum(ModelStatus).optional(),
})

export type CategoryUpdateDTO = z.infer<typeof CategoryUpdateSchema>;
export type CategoryCreateDTO = z.infer<typeof CategoryCreateSchema>;
export type CategoryCondDTO = z.infer<typeof CategoryCondDTOScheme>
