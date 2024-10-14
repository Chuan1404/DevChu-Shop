"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const category_1 = require("./modules/category");
const sequelize_1 = require("./share/component/sequelize");
const brand_1 = require("./modules/brand");
dotenv_1.default.config();
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize_1.sequelize.authenticate();
    console.log("Connection has been established successfully");
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 3001;
    // middlewares
    app.use(express_1.default.json());
    app.use("/", (0, category_1.setUpCategoryModule)(sequelize_1.sequelize));
    app.use("/", (0, brand_1.setUpBrandModule)(sequelize_1.sequelize));
    app.listen(PORT, () => {
        console.log(`Server run at port ${PORT}`);
    });
}))();
