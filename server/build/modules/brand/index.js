"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpBrandModule = void 0;
const express_1 = require("express");
const dto_1 = require("./infras/repository/dto");
const repository_1 = require("./infras/repository");
const usecase_1 = require("./usecase");
const httpService_1 = require("./infras/transport/express/httpService");
const setUpBrandModule = (sequelize) => {
    (0, dto_1.init)(sequelize);
    const repository = new repository_1.MySQLBrandRepository(sequelize, dto_1.modelName);
    const usecase = new usecase_1.BrandUsecase(repository);
    const httpService = new httpService_1.BrandHttpService(usecase);
    const router = (0, express_1.Router)();
    router.get("/brands", httpService.list.bind(httpService));
    router.get("/brands/:id", httpService.get.bind(httpService));
    router.post("/brands", httpService.create.bind(httpService));
    router.patch("/brands/:id", httpService.update.bind(httpService));
    router.delete("/brands/:id", httpService.delete.bind(httpService));
    return router;
};
exports.setUpBrandModule = setUpBrandModule;
