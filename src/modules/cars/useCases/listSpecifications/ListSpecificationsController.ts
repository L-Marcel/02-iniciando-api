import { Response, Request } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { container } from "tsyringe";

export class ListSpecificationsController {
  async handle(req: Request, res: Response) {
    const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);
    const all = await listSpecificationsUseCase.execute();

    return res.status(200).json(all);
  }
}