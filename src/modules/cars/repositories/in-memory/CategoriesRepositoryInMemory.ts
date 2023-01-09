import { Category, CategoryConstructor } from "../../entities/Category";
import { CategoriesRepositoryType } from "../CategoriesRepository";

export class CategoriesRepositoryInMemory implements CategoriesRepositoryType {
  categories: Category[] = [];
  
  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find(category => category.name === name);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create(data: CategoryConstructor): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      ...data,
      created_at: new Date()
    });

    this.categories.push(category);
  }

  async findByID(id: string): Promise<Category | undefined> {
    return this.categories.find(category => category.id === id);
  }
}