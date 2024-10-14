import { Sequelize } from "sequelize";
import { BaseRepositorySequelize } from "../../../../share/repository/sequelize";
import { BrandCondDTO, BrandUpdateDTO } from "../../model/dto";
import { Brand } from "../../model/model";

export class MySQLBrandRepository extends BaseRepositorySequelize<
  Brand,
  BrandCondDTO,
  BrandUpdateDTO
> {
  constructor(sequelize: Sequelize, modelName: string) {
    super(sequelize, modelName)
  }
}
