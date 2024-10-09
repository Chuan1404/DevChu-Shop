import { Request, Response } from "express";
import { CategoryPersistence } from "./repository/dto";
import { z } from "zod";
import { Op } from "sequelize";
import { CategoryStatus } from "../model/model";

const PagingDTOSchema = z.object({
  limit: z.coerce.number().int().min(1).default(1),
  page: z.coerce.number().int().min(1).default(1),
});
type PagingDTO = z.infer<typeof PagingDTOSchema>;

export const listCategory = async (req: Request, res: Response) => {
  const { success, data, error } = PagingDTOSchema.safeParse(req.query);

  if (!success) {
    res.status(400).json({
      error: error.message,
    });
    return;
  }

  const { limit, page } = data;

  let { rows, count } = await CategoryPersistence.findAndCountAll({
    limit,
    offset: (page - 1) * limit,
    order: [["id", "DESC"]],
    where: {
      status: {
        [Op.ne]: CategoryStatus.Deleted,
      },
    },
  });

  res.status(200).json({
    data: rows,
    limit,
    page,
    total: count,
  });
};
