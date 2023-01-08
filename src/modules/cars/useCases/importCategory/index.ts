import { ImportCategoryUseCase } from "./ImportCategoryUseCase";
import { ImportCategoryController } from "./ImportCategoryController";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

export const categoriesRepository = CategoriesRepository.getInstance();
export const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository);
export const importCategoryController = new ImportCategoryController(importCategoryUseCase);