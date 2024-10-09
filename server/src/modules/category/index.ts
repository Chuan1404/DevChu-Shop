import { Router } from "express";
import { getCategory } from "./infras/get";
import { createCategory } from "./infras/create";
import { updateCategory } from "./infras/update";
import { deleteCategory } from "./infras/delete";
import { listCategory } from "./infras/list";
import { Sequelize } from "sequelize";
import { init } from "./infras/repository/dto";

export const setUpCategoryModule = (sequelize: Sequelize): Router => {
  init(sequelize);

  const router = Router();

  router.get("/categories", listCategory);
  router.get("/categories/:id", getCategory);
  router.post("/categories", createCategory);
  router.patch("/categories/:id", updateCategory);
  router.delete("/categories/:id", deleteCategory);

  return router;
};
