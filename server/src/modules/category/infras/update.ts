import { Request, Response } from "express";
import { CategoryUpdateSchema } from "../model/dto";
import { CategoryPersistence } from "./repository/dto";
import { CategoryStatus } from "../model/model";

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { success, data, error } = CategoryUpdateSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      error: error.message,
    });
    return;
  }

  const category = await CategoryPersistence.findByPk(id);

  if (!category || category.status == CategoryStatus.Deleted) {
    res.status(400).json({
      error: "Category not found",
    });
    return;
  }

  await CategoryPersistence.update(data, { where: { id } });
  res.status(200).json({
    data: id,
  });
};
