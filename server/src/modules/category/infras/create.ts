import { Request, Response } from "express";
import { CategoryCreateSchema } from "../model/dto";
import { v7 } from "uuid";
import { CategoryPersistence } from "./repository/dto";

export const createCategory = async (req: Request, res: Response) => {
  const { success, data, error } = CategoryCreateSchema.safeParse(req.body);

  if (!success) {
    res.status(400).json({
      error: error.message,
    });
    return;
  }

  const id = v7()
  await CategoryPersistence.create({id, ...data})

  res.status(200).json({
    data: id
  })
};
