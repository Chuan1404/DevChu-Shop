import { Router } from "express";
import { Sequelize } from "sequelize";
import { init, modelName } from "./infras/repository/dto";
import { MySQLProductRepository } from "./infras/repository";
import { ProductUsecase } from "./usecase";
import { ProductHttpService } from "./infras/transport/express/httpService";
import {
  RPCProductBrandRepository,
  RPCProductCategoryRepository,
} from "./infras/rpc";
import { config } from "../../share/component/config";

export const setUpProductModule = (sequelize: Sequelize): Router => {
  init(sequelize);

  const repository = new MySQLProductRepository(sequelize, modelName);
  const usecase = new ProductUsecase(repository);

  const productBrandRepository = new RPCProductBrandRepository(
    config.rpc.productBrand
  );
  const productCategoryRepository = new RPCProductCategoryRepository(
    config.rpc.productCategory
  );
  const httpService = new ProductHttpService(
    usecase,
    productBrandRepository,
    productCategoryRepository
  );

  const router = Router();

  router.get("/products", httpService.list.bind(httpService));
  router.get("/products/:id", httpService.get.bind(httpService));
  router.post("/products", httpService.create.bind(httpService));
  router.patch("/products/:id", httpService.update.bind(httpService));
  router.delete("/products/:id", httpService.delete.bind(httpService));

  return router;
};
