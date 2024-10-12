import { Request, Response } from "express";
import { Op } from "sequelize";
import { PagingDTOSchema } from "../../../share/model/paging";
import { CategoryStatus } from "../model/model";
import { CategoryPersistence } from "./repository/dto";

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
