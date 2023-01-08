import { ImportCategoryUseCase } from "./importCategoryUseCase";
import { Request, Response } from "express";

export class ImportCategoryController {
  constructor(private importCategoryUseCase: ImportCategoryUseCase) {}

  async handle(req: Request, res: Response) {
    const { file } = req;

    await this.importCategoryUseCase.execute(file);
    return res.status(200).send();
  }
}