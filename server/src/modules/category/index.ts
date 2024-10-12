import { Router } from "express";
import { getCategory } from "./infras/get";
import { createCategory } from "./infras/create";
import { updateCategory } from "./infras/update";
import { deleteCategory } from "./infras/delete";
import { listCategory } from "./infras/list";
import { Sequelize } from "sequelize";
import { init, modelName } from "./infras/repository/dto";
import { CategoryHttpService } from "./infras/transport/httpService";
import { CategoryUseCase } from "./usecase";
import { MySQLCategoryRepository } from "./infras/repository/repo";

// export const setUpCategoryModule = (sequelize: Sequelize): Router => {
//   init(sequelize);

//   const router = Router();

//   router.get("/categories", listCategory);
//   router.get("/categories/:id", getCategory);
//   router.post("/categories", createCategory);
//   router.patch("/categories/:id", updateCategory);
//   router.delete("/categories/:id", deleteCategory);

//   return router;
// };

export const setUpCategoryModule = (sequelize: Sequelize): Router => {
  init(sequelize);

  const repository = new MySQLCategoryRepository(sequelize, modelName)
  const usecase = new CategoryUseCase(repository)
  const httpService = new CategoryHttpService(usecase)

  const router = Router();

  router.get("/categories", listCategory);
  router.get("/categories/:id", getCategory);
  router.post("/categories", httpService.create);
  router.patch("/categories/:id", updateCategory);
  router.delete("/categories/:id", deleteCategory);

  return router;
};
