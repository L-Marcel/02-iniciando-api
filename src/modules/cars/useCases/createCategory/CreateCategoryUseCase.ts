import { CategoriesRepositoryType } from "../../repositories/CategoriesRepository";
import { CategoryConstructor } from "../../entities/Category";
import { injectable, inject } from "tsyringe";

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
      throw new Error("Category already exists!");
    }
  
    await this.categoriesRepository.create({
      name,
      description
    });
  }
}