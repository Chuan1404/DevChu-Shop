import { Request, Response } from "express";
import { ICategoryUseCase } from "../../interface";
import { CategoryCreateDTO, CategoryCreateSchema } from "../../model/dto";

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
}
