import { Router } from "express";
import { Sequelize } from "sequelize";
import { init, modelName } from "./infras/repository/dto";
import { MySQLCategoryRepository } from "./infras/repository";
import { CategoryHttpService } from "./infras/transport/express/httpService";
import { CreateCmdHandler } from "./usecase/createCmdHandler";
import { UpdateCmdHandler } from "./usecase/updateCmdHandler";
import { DeleteCmdHandler } from "./usecase/deleteCmdHandler";
import { GetQueryHandler } from "./usecase/getQueryHandler";
import { ListQueryHandler } from "./usecase/listQueryHandler";

export const setUpCategoryModule = (sequelize: Sequelize): Router => {
  init(sequelize);

  const repository = new MySQLCategoryRepository(sequelize, modelName);

  const createCommand = new CreateCmdHandler(repository);
  const updateCommand = new UpdateCmdHandler(repository);
  const deleteCommand = new DeleteCmdHandler(repository);
  const getQuery = new GetQueryHandler(repository);
  const listQuery = new ListQueryHandler(repository);
  const httpService = new CategoryHttpService(
    listQuery,
    getQuery,
    createCommand,
    updateCommand,
    deleteCommand
  );

  const router = Router();

  router.get("/categories", httpService.list.bind(httpService));
  router.get("/categories/:id", httpService.get.bind(httpService));
  router.post("/categories", httpService.create.bind(httpService));
  router.patch("/categories/:id", httpService.update.bind(httpService));
  router.delete("/categories/:id", httpService.delete.bind(httpService));

  return router;
};
