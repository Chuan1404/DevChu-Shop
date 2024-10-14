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
exports.BrandHttpService = void 0;
const paging_1 = require("../../../../../share/model/paging");
const dto_1 = require("../../../model/dto");
class BrandHttpService {
    constructor(useCase) {
        this.useCase = useCase;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.useCase.create(req.body);
                res.status(201).json({ data: result });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ error: error.message });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let brand = yield this.useCase.get(id);
            res.status(200).json({
                data: brand,
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield this.useCase.update(id, req.body);
                res.status(200).json({
                    data: id,
                });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { success, data: paging, error, } = paging_1.PagingDTOSchema.safeParse(req.query);
            if (!success) {
                res.status(400).json({
                    error: error.message,
                });
                return;
            }
            let cond = dto_1.BrandCondScheme.parse(req.query);
            let result = yield this.useCase.list(cond, paging);
            res.status(200).json({
                data: result,
                paging,
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield this.useCase.delete(id);
            res.status(200).json({
                data: id,
            });
        });
    }
}
exports.BrandHttpService = BrandHttpService;
