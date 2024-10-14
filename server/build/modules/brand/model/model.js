"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandSchema = void 0;
const zod_1 = require("zod");
const baseModel_1 = require("../../../share/model/baseModel");
exports.BrandSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().min(3, "Name must be at least 3 characters"),
    image: zod_1.z.string().optional(),
    tagLine: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(baseModel_1.ModelStatus).default(baseModel_1.ModelStatus.ACTIVE),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date()
});
