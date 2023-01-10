
import { CategoriesRepository } from "../../infra/typeorm/repositories/CategoriesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: CategoriesRepository
  ) {}

  async execute() {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}