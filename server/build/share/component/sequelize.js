"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const dotenv_1 = require("dotenv");
const sequelize_1 = require("sequelize");
(0, dotenv_1.config)();
exports.sequelize = new sequelize_1.Sequelize({
    database: process.env.DB_NAME || "",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT),
    dialect: "mysql",
    pool: {
        min: 2,
        max: 20,
        acquire: 30000,
        idle: 60000
    },
    logging: false
});
