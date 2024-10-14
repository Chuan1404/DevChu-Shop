import { v7 } from "uuid";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../../../share/model/baseError";
import { ModelStatus } from "../../../share/model/baseModel";
import { PagingDTO } from "../../../share/model/paging";
import { IBrandReposity, IBrandUseCase } from "../interface";
import {
  BrandCondDTO,
  BrandCreateDTO,
  BrandCreateSchema,
  BrandUpdateDTO,
  BrandUpdateSchema,
} from "../model/dto";
import { Brand } from "../model/model";

export class BrandUsecase implements IBrandUseCase {
  constructor(private readonly repository: IBrandReposity) {}

  async create(data: BrandCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = BrandCreateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    const isExisted = await this.repository.findByCond({
      name: parsedData.name,
    });

    if (isExisted) {
      throw ErrDataExisted;
    }

    let newId = v7();
    const brand: Brand = {
      id: newId,
      name: parsedData.name,
      status: ModelStatus.ACTIVE,
      description: parsedData.description,
      image: parsedData.image,
      tagLine: parsedData.tagLine,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.insert(brand);

    return newId;
  }
  async update(id: string, data: BrandUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = BrandUpdateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let brand = await this.repository.get(id);

    if (!brand || brand.status === ModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }
  async get(id: string): Promise<Brand | null> {
    let data = await this.repository.get(id);

    if (!data || data.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return data;
  }
  async list(cond: BrandCondDTO, paging: PagingDTO): Promise<Brand[] | null> {
    let data = await this.repository.list(cond, paging);

    return data;
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let brand = await this.repository.get(id);
    if (!brand || brand.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
