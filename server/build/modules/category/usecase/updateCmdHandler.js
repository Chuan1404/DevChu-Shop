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
exports.UpdateCmdHandler = void 0;
const dto_1 = require("../model/dto");
const err_1 = require("../model/err");
const baseModel_1 = require("../../../share/model/baseModel");
const baseError_1 = require("../../../share/model/baseError");
class UpdateCmdHandler {
    constructor(repository) {
        this.repository = repository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, data: parsedData, error, } = dto_1.CategoryUpdateSchema.safeParse(command.data);
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
            let category = yield this.repository.get(command.id);
            if (!category || category.status === baseModel_1.ModelStatus.DELETED) {
                throw baseError_1.ErrDataNotFound;
            }
            yield this.repository.update(command.id, parsedData);
        });
    }
}
exports.UpdateCmdHandler = UpdateCmdHandler;
