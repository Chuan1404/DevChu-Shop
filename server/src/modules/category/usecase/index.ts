import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/baseModel";
import { ICategoryUseCase, IRepository } from "../interface";
import { CategoryCreateDTO } from "../model/dto";
import { Category } from "../model/model";

export class CategoryUseCase implements ICategoryUseCase {
  constructor(private readonly repository: IRepository) {}

  async create(data: CategoryCreateDTO): Promise<string> {
    let newId = v7();
    const category: Category = {
      id: newId,
      name: data.name,
      position: 0,
      status: ModelStatus.ACTIVE,
      description: data.description,
      image: data.image,
      parentId: data.parent_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.insert(category);

    return newId;
  }
}
