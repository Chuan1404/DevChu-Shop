import dotenv from "dotenv";
import express from "express";
import { setUpCategoryModule } from "./modules/category";
import { sequelize } from "./share/component/sequelize";
import { setUpBrandModule } from "./modules/brand";
import { setUpProductModule } from "./modules/product";

dotenv.config();

(async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully");

  const app = express();
  const PORT = process.env.PORT || 3001;

  // middlewares
  app.use(express.json());

  app.use("/", setUpCategoryModule(sequelize));
  app.use("/", setUpBrandModule(sequelize));
  app.use("/", setUpProductModule(sequelize));

  app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`);
  });
})();
