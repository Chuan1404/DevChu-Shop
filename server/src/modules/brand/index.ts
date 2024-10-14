import { Router } from "express";
import { Sequelize } from "sequelize";
import { init, modelName } from "./infras/repository/dto";
import { MySQLBrandRepository } from "./infras/repository";
import { BrandUsecase } from "./usecase";
import { BrandHttpService } from "./infras/transport/express/httpService";

export const setUpBrandModule = (sequelize: Sequelize): Router => {
  init(sequelize)

  const repository = new MySQLBrandRepository(sequelize, modelName);
  const usecase = new BrandUsecase(repository);
  const httpService = new BrandHttpService(usecase);

  const router = Router();

  router.get("/brands", httpService.list.bind(httpService));
  router.get("/brands/:id", httpService.get.bind(httpService));
  router.post("/brands", httpService.create.bind(httpService));
  router.patch("/brands/:id", httpService.update.bind(httpService));
  router.delete("/brands/:id", httpService.delete.bind(httpService));

  return router;
};
