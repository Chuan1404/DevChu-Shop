import { Request, Response } from "express";
import { CategoryPersistence } from "./repository/dto";

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryPersistence.findByPk(id);

  if (!category) {
    res.status(400).json({
      error: "Category not found",
    });
    return;
  }

  await CategoryPersistence.destroy({where: {id}});
  res.status(200).json({
    data: id,
  });
};
