import { IQueryHandler } from "../../../share/interface";
import { ErrDataNotFound } from "../../../share/model/baseError";
import { ModelStatus } from "../../../share/model/baseModel";
import { GetQuery, ICategoryReposity } from "../interface";
import { Category } from "../model/model";

export class GetQueryHandler
  implements IQueryHandler<GetQuery, Category | null>
{
  constructor(private readonly repository: ICategoryReposity) {}

  async query(command: GetQuery): Promise<Category | null> {
    let data = await this.repository.get(command.id);

    if (!data || data.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return data;
  }
}
