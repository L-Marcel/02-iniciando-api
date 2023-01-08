import { Category, CategoryConstructor } from "../../model/Category";

export type CategoriesRepositoryType = {
  findByName(name: string): Category | undefined;
  list(query?: string): Category[];
  create(data: CategoryConstructor): void;
  findByID(id: string): Category | undefined;
}

export class CategoriesRepository implements CategoriesRepositoryType {
  private categories: Category[] = [];

  private static INSTANCE: CategoriesRepository;
  private constructor() {
    this.categories = [];
  }

  static getInstance() {
    if(!this.INSTANCE) {
      this.INSTANCE = new CategoriesRepository();
    }

    return this.INSTANCE;
  }

  create({
    name,
    description
  }: CategoryConstructor) {
    const newCategory = new Category({
      name,
      description
    });
  
    this.categories.push(newCategory);
  }

  list() {
    return this.categories;
  }

  findByID(id?: string) {
    return this.categories.find(
      (category) => category.id === id
    );
  }

  findByName(name?: string) {
    return this.categories.find(
      (category) => category.name === name
    );
  }
}