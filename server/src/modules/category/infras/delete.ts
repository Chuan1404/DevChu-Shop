import { Request, Response } from "express";

export const deleteCategory = (req: Request, res: Response) => {
    res.status(200).json({
        data: []
    })
}