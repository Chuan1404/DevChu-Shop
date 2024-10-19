import { z } from "zod";
import { ModelStatus, ProductGender } from "../../../share/model/baseModel";
import {
  ErrIdMustBeValid,
  ErrNameMustBeAtLeast2Characters,
  ErrPriceMustBeNonnegative,
  ErrPriceMustBePositive,
} from "../../../share/model/baseError";

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, ErrNameMustBeAtLeast2Characters),
  price: z.number().positive(ErrPriceMustBePositive),
  salePrice: z.number().nonnegative(ErrPriceMustBeNonnegative),
  colors: z.string().optional(),
  quantity: z.number().int().nonnegative(ErrPriceMustBeNonnegative),
  brandId: z.string().uuid(ErrIdMustBeValid).optional(),
  categoryId: z.string().uuid(ErrIdMustBeValid).optional(),
  content: z.string().optional(),
  description: z.string().optional(),
  rating: z.number().min(0).max(5),
  saleCount: z.number().int().nonnegative(),
  status: z.nativeEnum(ModelStatus).default(ModelStatus.ACTIVE),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProductBrandSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, ErrNameMustBeAtLeast2Characters),
});

export const ProductCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, ErrNameMustBeAtLeast2Characters),
});

export type Product = z.infer<typeof ProductSchema> & {category?: ProductCategory, brand?: ProductBrand};
export type ProductCategory = z.infer<typeof ProductCategorySchema>;
export type ProductBrand = z.infer<typeof ProductBrandSchema>;


