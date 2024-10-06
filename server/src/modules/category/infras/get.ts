import { Request, Response } from "express";

export const getCategory = (req: Request, res: Response) => {
    res.status(200).json({
        data: []
    })
}