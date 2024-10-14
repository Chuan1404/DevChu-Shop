"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCmdHandler = void 0;
const dto_1 = require("../model/dto");
const err_1 = require("../model/err");
const baseError_1 = require("../../../share/model/baseError");
const uuid_1 = require("uuid");
const baseModel_1 = require("../../../share/model/baseModel");
class CreateCmdHandler {
    constructor(repository) {
        this.repository = repository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, data: parsedData, error, } = dto_1.CategoryCreateSchema.safeParse(command.data);
            if (error) {
                const issues = error.issues;
                for (const issue of issues) {
                    if (issue.path[0] == "name") {
                        throw err_1.ErrCategoryNameTooShort;
                    }
                }
            }
            if (!success) {
                throw err_1.ErrCategoryInvalid;
            }
            const isExisted = yield this.repository.findByCond({
                name: parsedData.name,
            });
            if (isExisted) {
                throw baseError_1.ErrDataExisted;
            }
            let newId = (0, uuid_1.v7)();
            const category = {
                id: newId,
                name: parsedData.name,
                position: 0,
                status: baseModel_1.ModelStatus.ACTIVE,
                description: parsedData.description,
                image: parsedData.image,
                parentId: parsedData.parent_id,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            yield this.repository.insert(category);
            return newId;
        });
    }
}
exports.CreateCmdHandler = CreateCmdHandler;
