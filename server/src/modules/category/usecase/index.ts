import { v7 } from "uuid";
import { ModelStatus } from "../../../share/model/baseModel";
import { ICategoryUseCase, IRepository } from "../interface";
import {
  CategoryCondDTO,
  CategoryCreateDTO,
  CategoryCreateSchema,
  CategoryUpdateDTO,
  CategoryUpdateSchema,
} from "../model/dto";
import { Category } from "../model/model";
import { PagingDTO } from "../../../share/model/paging";
import { ErrDataNotFound } from "../../../share/model/baseError";
import { ZodError } from "zod";
import { ErrCategoryInvalid, ErrCategoryNameTooShort } from "../model/err";

export class CategoryUseCase implements ICategoryUseCase {
  constructor(private readonly repository: IRepository) {}

  async create(data: CategoryCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = CategoryCreateSchema.safeParse(data);

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

  async get(id: string): Promise<Category | null> {
    let data = await this.repository.get(id);

    if (!data || data.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return data;
  }

  async list(
    cond: CategoryCondDTO,
    paging: PagingDTO
  ): Promise<Category[] | null> {
    let data = await this.repository.list(cond, paging);

    return data;
  }

  async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = CategoryUpdateSchema.safeParse(data);

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

    let category = await this.repository.get(id);

    if (!category || category.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.update(id, parsedData);
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let category = await this.repository.get(id);
    if (!category || category.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
