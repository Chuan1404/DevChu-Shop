import { z } from "zod";
import { ErrIdMustBeValid, ErrNameMustBeAtLeast2Characters, ErrPriceMustBeNonnegative, ErrPriceMustBePositive } from "../../../share/model/baseError";
import { ErrFromPriceMustBePositive, ErrToPriceMustBePositive } from "./error";

export const ProductCreateSchema = z.object({
  name: z.string().min(2, ErrNameMustBeAtLeast2Characters),
  price: z.number().positive(ErrPriceMustBePositive),
  salePrice: z.number().nonnegative(ErrPriceMustBeNonnegative),
  quantity: z.number().int().nonnegative(ErrPriceMustBeNonnegative),
  brandId: z.string().uuid(ErrIdMustBeValid).optional(),
  categoryId: z.string().uuid(ErrIdMustBeValid).optional(),
  content: z.string().optional(),
  description: z.string().optional(),
});

export const ProductUpdateSchema = z.object({
  name: z.string().min(2, ErrNameMustBeAtLeast2Characters).optional(),
  price: z.number().positive(ErrPriceMustBePositive).optional(),
  salePrice: z.number().nonnegative(ErrPriceMustBeNonnegative).optional(),
  quantity: z.number().int().nonnegative(ErrPriceMustBeNonnegative).optional(),
  brandId: z.string().uuid(ErrIdMustBeValid).optional(),
  categoryId: z.string().uuid(ErrIdMustBeValid).optional(),
  content: z.string().optional(),
  description: z.string().optional(),
});

export const ProductCondScheme = z.object({
  name: z.string().optional(),
  fromPrice: z.number().positive(ErrFromPriceMustBePositive).optional(),
  toPrice: z.number().positive(ErrToPriceMustBePositive).optional(),
});

export type ProductCreateDTO = z.infer<typeof ProductCreateSchema>;
export type ProductUpdateDTO = z.infer<typeof ProductUpdateSchema>;
export type ProductCondDTO = z.infer<typeof ProductCondScheme>;
