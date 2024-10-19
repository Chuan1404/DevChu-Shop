import { v7 } from "uuid";
import {
  ErrDataExisted,
  ErrDataInvalid,
  ErrDataNotFound,
} from "../../../share/model/baseError";
import { ModelStatus } from "../../../share/model/baseModel";
import { PagingDTO } from "../../../share/model/paging";
import { IProductReposity, IProductUseCase } from "../interface";
import {
  ProductCondDTO,
  ProductCreateDTO,
  ProductCreateSchema,
  ProductUpdateDTO,
  ProductUpdateSchema,
} from "../model/dto";
import { Product } from "../model/model";


export class ProductUsecase implements IProductUseCase {
  constructor(private readonly repository: IProductReposity) {}

  async create(data: ProductCreateDTO): Promise<string> {
    const {
      success,
      data: parsedData,
      error,
    } = ProductCreateSchema.safeParse(data);

    if (!success) {
      console.log(error.issues)
      throw ErrDataInvalid;
    }

    const isExisted = await this.repository.findByCond({
      name: parsedData.name,
    });

    if (isExisted) {
      throw ErrDataExisted;
    }

    let newId = v7();
    const Product: Product = {
      id: newId,
      name: parsedData.name,
      status: ModelStatus.ACTIVE,
      description: parsedData.description,
      price: parsedData.price,
      salePrice: parsedData.salePrice,
      quantity: parsedData.quantity,
      rating: 0,
      saleCount: 0,
      brandId: parsedData.brandId,
      categoryId: parsedData.categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.insert(Product);

    return newId;
  }
  async update(id: string, data: ProductUpdateDTO): Promise<boolean> {
    const {
      success,
      data: parsedData,
      error,
    } = ProductUpdateSchema.safeParse(data);

    if (!success) {
      throw ErrDataInvalid;
    }

    let Product = await this.repository.get(id);

    if (!Product || Product.status === ModelStatus.DELETED) {
      throw ErrDataInvalid;
    }

    return await this.repository.update(id, parsedData);
  }
  async get(id: string): Promise<Product | null> {
    let data = await this.repository.get(id);

    if (!data || data.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return data;
  }
  async list(cond: ProductCondDTO, paging: PagingDTO): Promise<Product[] | null> {
    let data = await this.repository.list(cond, paging);

    return data;
  }

  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    let Product = await this.repository.get(id);
    if (!Product || Product.status === ModelStatus.DELETED) {
      throw ErrDataNotFound;
    }

    return await this.repository.delete(id, isHard);
  }
}
