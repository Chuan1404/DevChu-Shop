"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategorySchema = void 0;
const zod_1 = require("zod");
const baseModel_1 = require("../../../share/model/baseModel");
exports.CategorySchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
    image: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    position: zod_1.z.number().min(0, "invalid position").default(0),
    parentId: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(baseModel_1.ModelStatus),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
