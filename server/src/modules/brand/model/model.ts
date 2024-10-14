import { z } from "zod";
import { ModelStatus } from "../../../share/model/baseModel";

export const BrandSchema = z.object({
    id: z.string(),
    name: z.string().min(3, "Name must be at least 3 characters"),
    image: z.string().optional(),
    tagLine: z.string().optional(),
    description: z.string().optional(),
    status: z.nativeEnum(ModelStatus).default(ModelStatus.ACTIVE),
    createdAt: z.date(),
    updatedAt: z.date()
})

export type Brand = z.infer<typeof BrandSchema>