import dotenv from "dotenv";
import express from "express";
import { setUpCategoryModule } from "./modules/category";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json());

app.use("/", setUpCategoryModule())

app.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`);
});
