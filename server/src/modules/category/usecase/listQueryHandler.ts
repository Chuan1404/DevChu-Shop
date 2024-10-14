import { IQueryHandler } from "../../../share/interface";
import { ModelStatus } from "../../../share/model/baseModel";
import { ICategoryReposity, ListQuery } from "../interface";
import { Category } from "../model/model";

export class ListQueryHandler
  implements IQueryHandler<ListQuery, Category[] | null>
{
  constructor(private readonly repository: ICategoryReposity) {}
  async query(command: ListQuery): Promise<Category[] | null> {
    let data = await this.repository.list(command.cond, command.paging);

    return data;
  }
}
