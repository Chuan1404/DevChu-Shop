import { Request, Response } from "express";
import { CategoryPersistence } from "./repository/dto";
import { CategoryStatus } from "../model/model";

export const getCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  let category = await CategoryPersistence.findByPk(id);

  if (!category || category.status == CategoryStatus.Deleted) {
    res.status(400).json({
      error: "Category not found",
    });
    return;
  }

  res.status(200).json({
    data: category,
  });
};
