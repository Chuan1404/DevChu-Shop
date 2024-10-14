import { Sequelize } from "sequelize";
import { BaseRepositorySequelize } from "../../../../share/repository/sequelize";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../model/dto";
import { Category } from "../../model/model";

export class MySQLCategoryRepository extends BaseRepositorySequelize<
Category,
CategoryCondDTO,
CategoryUpdateDTO
> {
constructor(sequelize: Sequelize, modelName: string) {
  super(sequelize, modelName)
}
}
