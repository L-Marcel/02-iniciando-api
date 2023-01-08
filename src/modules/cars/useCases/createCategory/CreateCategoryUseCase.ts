import { CategoriesRepositoryType } from "../../repositories/implementations/CategoriesRepository";
import { CategoryConstructor } from "../../model/Category";
import { ApiError } from "../../../../errors/ApiError";

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepositoryType) {}

  execute(
    { name, description }: CategoryConstructor
  ) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if(categoryAlreadyExists) {
      throw new ApiError(400, "Category already exists!");
    }
  
    this.categoriesRepository.create({
      name,
      description
    });
  }
}