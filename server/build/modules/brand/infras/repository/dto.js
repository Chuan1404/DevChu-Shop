"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelName = exports.BrandPersistence = void 0;
exports.init = init;
const sequelize_1 = require("sequelize");
class BrandPersistence extends sequelize_1.Model {
}
exports.BrandPersistence = BrandPersistence;
exports.modelName = "Brand";
function init(sequelize) {
    BrandPersistence.init({
        id: {
            type: sequelize_1.DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        tagLine: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            field: "tag_line",
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM("ACTIVE", "INACTIVE", "DELETED"),
            allowNull: false,
            defaultValue: "ACTIVE",
        },
    }, {
        sequelize,
        modelName: exports.modelName,
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        tableName: "brands",
    });
}
