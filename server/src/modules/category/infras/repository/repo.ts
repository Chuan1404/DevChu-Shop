import { Sequelize } from "sequelize";
import { PagingDTO } from "../../../../share/model/paging";
import { IRepository } from "../../interface";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../model/dto";
import { Category } from "../../model/model";

export class MySQLCategoryRepository implements IRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly modelName: string
  ) {}
  get(id: string): Promise<void> {
    throw new Error("err");
  }

  list(cond: CategoryCondDTO, paging: PagingDTO): Promise<Category[] | null> {
    throw new Error("err");
  }

  async insert(data: Category): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data)

    return true
  }

  delete(id: string): Promise<boolean> {
    throw new Error("err");
  }

  update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
    throw new Error("err");
  }
}
