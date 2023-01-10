import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

export class ListAvailableCarsController {
  async handle(req: Request, res: Response) {
    const {
      brand,
      category_id,
      name
    } = req.query;

    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);
    const availableCars = await listAvailableCarsUseCase.execute({
      brand: brand as string | undefined,
      category_id: category_id as string | undefined,
      name: name as string | undefined
    });

    return res.status(200).json(availableCars);
  }
}