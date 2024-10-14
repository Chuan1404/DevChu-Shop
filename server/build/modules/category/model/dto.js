"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryCondDTOScheme = exports.CategoryUpdateSchema = exports.CategoryCreateSchema = void 0;
const zod_1 = require("zod");
const baseModel_1 = require("../../../share/model/baseModel");
exports.CategoryCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
    image: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    parent_id: zod_1.z.string().optional(),
});
exports.CategoryUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters").optional(),
    image: zod_1.z.string().optional(),
    description: zod_1.z
        .string()
        .max(255, "descriptions must be at most 255 characters")
        .optional(),
    parent_id: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(baseModel_1.ModelStatus).optional(),
});
exports.CategoryCondDTOScheme = zod_1.z.object({
    name: zod_1.z.string().optional(),
    parent_id: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(baseModel_1.ModelStatus).optional(),
});
