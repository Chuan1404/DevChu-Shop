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
exports.DeleteCmdHandler = void 0;
const baseError_1 = require("../../../share/model/baseError");
const baseModel_1 = require("../../../share/model/baseModel");
class DeleteCmdHandler {
    constructor(repository) {
        this.repository = repository;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            let category = yield this.repository.get(command.id);
            if (!category || category.status === baseModel_1.ModelStatus.DELETED) {
                throw baseError_1.ErrDataNotFound;
            }
            yield this.repository.delete(command.id, command.isHard);
        });
    }
}
exports.DeleteCmdHandler = DeleteCmdHandler;
