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
exports.CategoryHttpService = void 0;
const paging_1 = require("../../../../../share/model/paging");
const dto_1 = require("../../../model/dto");
class CategoryHttpService {
    constructor(listQueryHandler, getQueryHandler, createCmdHandler, updateCmdHandler, deleteCmdHandler) {
        this.listQueryHandler = listQueryHandler;
        this.getQueryHandler = getQueryHandler;
        this.createCmdHandler = createCmdHandler;
        this.updateCmdHandler = updateCmdHandler;
        this.deleteCmdHandler = deleteCmdHandler;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cmd = { data: req.body };
                const result = yield this.createCmdHandler.execute(cmd);
                res.status(201).json({ data: result });
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const query = { id };
            let category = yield this.getQueryHandler.query(query);
            res.status(200).json({
                data: category,
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const cmd = { id, data: req.body };
                yield this.updateCmdHandler.execute(cmd);
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
            let cond = dto_1.CategoryCondDTOScheme.parse(req.query);
            let query = { cond, paging };
            let result = yield this.listQueryHandler.query(query);
            res.status(200).json({
                data: result,
                paging,
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let cmd = { id, isHard: false };
            yield this.deleteCmdHandler.execute(cmd);
            res.status(200).json({
                data: id,
            });
        });
    }
}
exports.CategoryHttpService = CategoryHttpService;
