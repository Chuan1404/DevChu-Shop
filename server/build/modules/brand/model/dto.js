"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandCondScheme = exports.BrandUpdateSchema = exports.BrandCreateSchema = void 0;
const zod_1 = require("zod");
const baseModel_1 = require("../../../share/model/baseModel");
exports.BrandCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
    image: zod_1.z.string().optional(),
    tagLine: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
});
exports.BrandUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
    image: zod_1.z.string().optional(),
    tagLine: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(baseModel_1.ModelStatus).optional(),
});
exports.BrandCondScheme = zod_1.z.object({
    name: zod_1.z.string().optional(),
    tagLine: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(baseModel_1.ModelStatus).optional(),
});
