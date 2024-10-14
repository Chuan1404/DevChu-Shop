import { ZodError } from "zod";
import { CreateCommand, ICategoryReposity } from "../interface";
import { ICommandHandler } from "../../../share/interface";
import { CategoryCreateSchema } from "../model/dto";
import { ErrCategoryInvalid, ErrCategoryNameTooShort } from "../model/err";
import { ErrDataExisted } from "../../../share/model/baseError";
import { v7 } from "uuid";
import { Category } from "../model/model";
import { ModelStatus } from "../../../share/model/baseModel";

export class CreateCmdHandler
  implements ICommandHandler<CreateCommand, string>
{
  constructor(private readonly repository: ICategoryReposity) {}

  async execute(command: CreateCommand): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = CategoryCreateSchema.safeParse(command.data);

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

    const isExisted = await this.repository.findByCond({
      name: parsedData.name,
    });

    if (isExisted) {
      throw ErrDataExisted;
    }

    let newId = v7();
    const category: Category = {
      id: newId,
      name: parsedData!.name,
      position: 0,
      status: ModelStatus.ACTIVE,
      description: parsedData!.description,
      image: parsedData!.image,
      parentId: parsedData!.parent_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.insert(category);

    return newId;
  }
}
