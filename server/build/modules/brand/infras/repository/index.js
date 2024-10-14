"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLBrandRepository = void 0;
const sequelize_1 = require("../../../../share/repository/sequelize");
class MySQLBrandRepository extends sequelize_1.BaseRepositorySequelize {
    constructor(sequelize, modelName) {
        super(sequelize, modelName);
    }
}
exports.MySQLBrandRepository = MySQLBrandRepository;
