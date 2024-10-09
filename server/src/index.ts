import dotenv from "dotenv";
import express from "express";
import { setUpCategoryModule } from "./modules/category";
import { sequelize } from "./share/component/sequelize";

dotenv.config();

(async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully");

  const app = express();
  const PORT = process.env.PORT || 3001;

  // middlewares
  app.use(express.json());

  app.use("/", setUpCategoryModule(sequelize));

  app.listen(PORT, () => {
    console.log(`Server run at port ${PORT}`);
  });
})();
