import { Sequelize } from "sequelize";
import { BaseRepositorySequelize } from "../../../../share/repository/sequelize";
import { ProductCondDTO, ProductUpdateDTO } from "../../model/dto";
import { Product } from "../../model/model";

export class MySQLProductRepository extends BaseRepositorySequelize<
  Product,
  ProductCondDTO,
  ProductUpdateDTO
> {
  constructor(sequelize: Sequelize, modelName: string) {
    super(sequelize, modelName)
  }
}
