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
exports.BrandUsecase = void 0;
const uuid_1 = require("uuid");
const baseError_1 = require("../../../share/model/baseError");
const baseModel_1 = require("../../../share/model/baseModel");
const dto_1 = require("../model/dto");
class BrandUsecase {
    constructor(repository) {
        this.repository = repository;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, data: parsedData, error, } = dto_1.BrandCreateSchema.safeParse(data);
            if (!success) {
                throw baseError_1.ErrDataInvalid;
            }
            const isExisted = yield this.repository.findByCond({
                name: parsedData.name,
            });
            if (isExisted) {
                throw baseError_1.ErrDataExisted;
            }
            let newId = (0, uuid_1.v7)();
            const brand = {
                id: newId,
                name: parsedData.name,
                status: baseModel_1.ModelStatus.ACTIVE,
                description: parsedData.description,
                image: parsedData.image,
                tagLine: parsedData.tagLine,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            yield this.repository.insert(brand);
            return newId;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, data: parsedData, error, } = dto_1.BrandUpdateSchema.safeParse(data);
            if (!success) {
                throw baseError_1.ErrDataInvalid;
            }
            let brand = yield this.repository.get(id);
            if (!brand || brand.status === baseModel_1.ModelStatus.DELETED) {
                throw baseError_1.ErrDataInvalid;
            }
            return yield this.repository.update(id, parsedData);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.repository.get(id);
            if (!data || data.status === baseModel_1.ModelStatus.DELETED) {
                throw baseError_1.ErrDataNotFound;
            }
            return data;
        });
    }
    list(cond, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.repository.list(cond, paging);
            return data;
        });
    }
    delete(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, isHard = false) {
            let brand = yield this.repository.get(id);
            if (!brand || brand.status === baseModel_1.ModelStatus.DELETED) {
                throw baseError_1.ErrDataNotFound;
            }
            return yield this.repository.delete(id, isHard);
        });
    }
}
exports.BrandUsecase = BrandUsecase;
