import { z } from "zod";
import { ModelStatus } from "../../../share/model/baseModel";

export const BrandCreateSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  image: z.string().optional(),
  tagLine: z.string().optional(),
  description: z.string().optional(),
});

export const BrandUpdateSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  image: z.string().optional(),
  tagLine: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(ModelStatus).optional(),
});

export const BrandCondScheme = z.object({
  name: z.string().optional(),
  tagLine: z.string().optional(),
  status: z.nativeEnum(ModelStatus).optional(),
});

export type BrandCreateDTO = z.infer<typeof BrandCreateSchema>;
export type BrandUpdateDTO = z.infer<typeof BrandUpdateSchema>;
export type BrandCondDTO = z.infer<typeof BrandCondScheme>;
