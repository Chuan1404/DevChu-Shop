import { Request, Response } from "express";
import { ICommandHandler, IQueryHandler } from "../../../../../share/interface";
import { PagingDTOSchema } from "../../../../../share/model/paging";
import {
  CreateCommand,
  DeleteCommand,
  GetQuery,
  ICategoryUseCase,
  ListQuery,
  UpdateCommand,
} from "../../../interface";
import { CategoryCondDTOScheme } from "../../../model/dto";
import { Category } from "../../../model/model";

export class CategoryHttpService {
  constructor(
    private readonly listQueryHandler: IQueryHandler<
      ListQuery,
      Category[] | null
    >,
    private readonly getQueryHandler: IQueryHandler<GetQuery, Category | null>,
    private readonly createCmdHandler: ICommandHandler<CreateCommand, string>,
    private readonly updateCmdHandler: ICommandHandler<UpdateCommand, void>,
    private readonly deleteCmdHandler: ICommandHandler<DeleteCommand, void>
  ) {}

  async create(req: Request, res: Response) {
    try {
      const cmd: CreateCommand = { data: req.body };
      const result = await this.createCmdHandler.execute(cmd);
      res.status(201).json({ data: result });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const query: GetQuery = { id };

    let category = await this.getQueryHandler.query(query);

    res.status(200).json({
      data: category,
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const cmd: UpdateCommand = { id, data: req.body };
      await this.updateCmdHandler.execute(cmd);
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

    let cond = CategoryCondDTOScheme.parse(req.query);
    let query: ListQuery = { cond, paging };
    let result = await this.listQueryHandler.query(query);

    res.status(200).json({
      data: result,
      paging,
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    let cmd: DeleteCommand = { id, isHard: false };

    await this.deleteCmdHandler.execute(cmd);

    res.status(200).json({
      data: id,
    });
  }
}
