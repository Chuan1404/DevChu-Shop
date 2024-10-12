import { Op, Sequelize } from "sequelize";
import { PagingDTO } from "../../../../share/model/paging";
import { IRepository } from "../../interface";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../model/dto";
import { Category, CategorySchema } from "../../model/model";
import { ModelStatus } from "../../../../share/model/baseModel";

export class MySQLCategoryRepository implements IRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private readonly modelName: string
  ) {}

  async get(id: string): Promise<Category | null> {
    let data = await this.sequelize.models[this.modelName].findByPk(id);

    if (!data) {
      return null;
    }

    return data.get({ plain: true });
  }

  async list(
    cond: CategoryCondDTO,
    paging: PagingDTO
  ): Promise<Category[] | null> {
    const { page, limit } = paging;
    const condSQL = { ...cond, status: { [Op.ne]: ModelStatus.DELETED } };

    const total = this.sequelize.models[this.modelName].count({
      where: condSQL,
    });

    const rows = await this.sequelize.models[this.modelName].findAll({
      where: condSQL,
      limit,
      order: [["id", "DESC"]],
      offset: (page - 1) * limit,
    });

    return rows.map((row) => row.get({ plain: true }));
  }

  async insert(data: Category): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data);

    return true;
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    if (isHard) {
      await this.sequelize.models[this.modelName].destroy({ where: { id } });
    } else {
      await this.sequelize.models[this.modelName].update(
        { status: ModelStatus.DELETED },
        { where: { id } }
      );
    }

    return true;
  }

  async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
    await this.sequelize.models[this.modelName].update(data, { where: { id } });
    return true;
  }
}
