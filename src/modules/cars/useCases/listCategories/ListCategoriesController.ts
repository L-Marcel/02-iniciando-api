import { Response, Request } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response) {
    const all = this.listCategoriesUseCase.execute();
    return res.json(all);
  }
}