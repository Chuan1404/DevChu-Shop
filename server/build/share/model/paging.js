"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagingDTOSchema = void 0;
const zod_1 = require("zod");
exports.PagingDTOSchema = zod_1.z.object({
    limit: zod_1.z.coerce.number().int().min(1).default(10),
    page: zod_1.z.coerce.number().int().min(1).default(1),
});
