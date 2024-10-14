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
exports.BaseRepositorySequelize = void 0;
const sequelize_1 = require("sequelize");
const baseModel_1 = require("../model/baseModel");
class BaseRepositorySequelize {
    constructor(sequelize, modelName) {
        this.sequelize = sequelize;
        this.modelName = modelName;
    }
    findByCond(cond) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.sequelize.models[this.modelName].findOne({ where: cond });
            if (!data) {
                return null;
            }
            return data.get({ plain: true });
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = yield this.sequelize.models[this.modelName].findByPk(id);
            if (!data) {
                return null;
            }
            return data.get({ plain: true });
        });
    }
    list(cond, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, limit } = paging;
            const condSQL = Object.assign(Object.assign({}, cond), { status: { [sequelize_1.Op.ne]: baseModel_1.ModelStatus.DELETED } });
            const total = this.sequelize.models[this.modelName].count({
                where: condSQL,
            });
            const rows = yield this.sequelize.models[this.modelName].findAll({
                where: condSQL,
                limit,
                order: [["id", "DESC"]],
                offset: (page - 1) * limit,
            });
            return rows.map((row) => row.get({ plain: true }));
        });
    }
    insert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sequelize.models[this.modelName].create(data);
            return true;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sequelize.models[this.modelName].update(data, {
                where: { id },
            });
            return true;
        });
    }
    delete(id_1) {
        return __awaiter(this, arguments, void 0, function* (id, isHard = false) {
            if (isHard) {
                yield this.sequelize.models[this.modelName].destroy({ where: { id } });
            }
            else {
                yield this.sequelize.models[this.modelName].update({ status: baseModel_1.ModelStatus.DELETED }, { where: { id } });
            }
            return true;
        });
    }
}
exports.BaseRepositorySequelize = BaseRepositorySequelize;
