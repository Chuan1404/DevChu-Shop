import { Request, Response } from "express";
import { config } from "../../../../../share/component/config";
import { PagingDTOSchema } from "../../../../../share/model/paging";
import {
  IBrandQueryRepository,
  ICategoryQueryRepository,
  IProductUseCase,
} from "../../../interface";
import { ProductCondScheme } from "../../../model/dto";

export class ProductHttpService {
  constructor(
    private readonly useCase: IProductUseCase,
    private readonly productBrandRepository: IBrandQueryRepository,
    private readonly productCategoryRepository: ICategoryQueryRepository
  ) {}

  async create(req: Request, res: Response) {
    try {
      const result = await this.useCase.create(req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;

    let data = await this.useCase.get(id);
    // let brand = await new RPCProductBranchRepository(config.rpc as any).get(data!.brandId!)
    let brand = await this.productBrandRepository.get(data!.brandId!);
    let category = await this.productCategoryRepository.get(data!.categoryId!);

    if (brand) {
      data!.brand = brand;
    }

    if (category) {
      data!.category = category;
    }

    res.status(200).json({
      data,
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.useCase.update(id, req.body);
      res.status(200).json({
        data: id,
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async list(req: Request, res: Response) {
    const {
      success,
      data: paging,
      error,
    } = PagingDTOSchema.safeParse(req.query);

    if (!success) {
      res.status(400).json({
        error: error.message,
      });
      return;
    }

    let cond = ProductCondScheme.parse(req.query);
    let result = await this.useCase.list(cond, paging);

    res.status(200).json({
      data: result,
      paging,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    await this.useCase.delete(id);

    res.status(200).json({
      data: id,
    });
  }
}
