import { Request, Response } from "express";

export const listCategory = (req: Request, res: Response) => {
    res.status(200).json({
        data: []
    })
}