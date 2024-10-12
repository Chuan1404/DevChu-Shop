import { Request, Response } from "express";
import { ICategoryUseCase } from "../../interface";
import {
  CategoryCondDTOScheme,
  CategoryCreateDTO,
  CategoryCreateSchema,
  CategoryUpdateSchema,
} from "../../model/dto";
import { PagingDTOSchema } from "../../../../share/model/paging";
import { Op } from "sequelize";
import { ModelStatus } from "../../../../share/model/baseModel";

export class CategoryHttpService {
  constructor(private readonly useCase: ICategoryUseCase) {}

  async create(req: Request, res: Response) {
    const { success, data, error } = CategoryCreateSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({
        message: error.message,
      });

      return;
    }

    const result = await this.useCase.create(data as CategoryCreateDTO);
    res.status(201).json({ data: result });
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;

    let category = await this.useCase.get(id);

    res.status(200).json({
      data: category,
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { success, data, error } = CategoryUpdateSchema.safeParse(req.body);

    if (!success) {
      res.status(400).json({
        error: error.message,
      });
      return;
    }

    await this.useCase.update(id, data);
    res.status(200).json({
      data: id,
    });
  }

  async list(req: Request, res: Response) {
    const { success, data: paging, error } = PagingDTOSchema.safeParse(req.query);

    if (!success) {
      res.status(400).json({
        error: error.message,
      });
      return;
    }

    let cond = CategoryCondDTOScheme.parse(req.query)
    let result = await this.useCase.list(cond, paging);

    res.status(200).json({
      data: result,
      paging
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
