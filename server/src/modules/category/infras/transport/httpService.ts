import { Request, Response } from "express";
import { PagingDTOSchema } from "../../../../share/model/paging";
import { ICategoryUseCase } from "../../interface";
import {
  CategoryCondDTOScheme,
  CategoryCreateDTO,
  CategoryCreateSchema,
  CategoryUpdateSchema,
} from "../../model/dto";
import { ZodError } from "zod";
import { ErrCategoryNameTooShort } from "../../model/err";

export class CategoryHttpService {
  constructor(private readonly useCase: ICategoryUseCase) {}

  async create(req: Request, res: Response) {
    try {
      const result = await this.useCase.create(req.body);
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({ error });
    }
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
    try {
      await this.useCase.update(id, req.body);
      res.status(200).json({
        data: id,
      });
    } catch (error) {
      res.status(400).json({ error });
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

    let cond = CategoryCondDTOScheme.parse(req.query);
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
