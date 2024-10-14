import { Op, Sequelize } from "sequelize";
import { IRepository } from "../interface";
import { PagingDTO } from "../model/paging";
import { ModelStatus } from "../model/baseModel";

export abstract class BaseRepositorySequelize<
  Entity,
  EntityCondDTO,
  EntityUpdateDTO
> implements IRepository<Entity, EntityCondDTO, EntityUpdateDTO>
{
  constructor(
    private readonly sequelize: Sequelize,
    private readonly modelName: string
  ) {}

  async findByCond(cond: EntityCondDTO): Promise<Entity | null> {
    let data = await this.sequelize.models[this.modelName].findOne({where: cond as any});

    if (!data) {
      return null;
    }

    return data.get({ plain: true });
  }

  async get(id: string): Promise<Entity | null> {
    let data = await this.sequelize.models[this.modelName].findByPk(id);

    if (!data) {
      return null;
    }

    return data.get({ plain: true });
  }

  async list(cond: EntityCondDTO, paging: PagingDTO): Promise<Entity[] | null> {
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

  async insert(data: Entity): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data as any);

    return true;
  }
  async update(id: string, data: EntityUpdateDTO): Promise<boolean> {
    await this.sequelize.models[this.modelName].update(data as any, {
      where: { id },
    });
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
}
