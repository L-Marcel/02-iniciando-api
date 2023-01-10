import { CategoriesRepositoryType } from "../../infra/typeorm/repositories/CategoriesRepository";
import { CategoryConstructor } from "../../infra/typeorm/entities/Category";
import { injectable, inject } from "tsyringe";
import { AppError } from "@errors/AppError";

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepositoryType
  ) {}

  async execute(
    { name, description }: CategoryConstructor
  ) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if(categoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }
  
    await this.categoriesRepository.create({
      name,
      description
    });
  }
}