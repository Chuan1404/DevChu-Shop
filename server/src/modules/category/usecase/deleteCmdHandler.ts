import { ICommandHandler } from "../../../share/interface";
import { ErrDataNotFound } from "../../../share/model/baseError";
import { ModelStatus } from "../../../share/model/baseModel";
import { DeleteCommand, ICategoryReposity } from "../interface";

export class DeleteCmdHandler implements ICommandHandler<DeleteCommand, void> {
  constructor(private readonly repository: ICategoryReposity) {}
  async execute(command: DeleteCommand): Promise<void> {
    let category = await this.repository.get(command.id);
    if (!category || category.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    await this.repository.delete(command.id, command.isHard);
  }
}
