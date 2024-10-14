import { ZodError } from "zod";
import { ICommandHandler, IRepository } from "../../../share/interface";
import { ICategoryReposity, UpdateCommand } from "../interface";
import { CategoryUpdateSchema } from "../model/dto";
import { ErrCategoryInvalid, ErrCategoryNameTooShort } from "../model/err";
import { Category } from "../model/model";
import { ModelStatus } from "../../../share/model/baseModel";
import { ErrDataNotFound } from "../../../share/model/baseError";

export class UpdateCmdHandler implements ICommandHandler<UpdateCommand, void> {
  constructor(private readonly repository: ICategoryReposity) {}

  async execute(command: UpdateCommand): Promise<void> {
    const {
      success,
      data: parsedData,
      error,
    } = CategoryUpdateSchema.safeParse(command.data);

    if (error) {
      const issues = (error as ZodError).issues;

      for (const issue of issues) {
        if (issue.path[0] == "name") {
          throw ErrCategoryNameTooShort;
        }
      }
    }

    if (!success) {
      throw ErrCategoryInvalid;
    }

    let category = await this.repository.get(command.id);

    if (!category || category.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    await this.repository.update(command.id, parsedData);
  }
}
