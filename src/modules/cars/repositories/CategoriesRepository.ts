import { Category, CategoryConstructor } from "../entities/Category";
import { Repository, getRepository } from "typeorm";

export type CategoriesRepositoryType = {
  findByName(name: string): Promise<Category | undefined>;
  list(query?: string): Promise<Category[]>;
  create(data: CategoryConstructor): Promise<void>;
  findByID(id: string): Promise<Category | undefined>;
}


export class CategoriesRepository implements CategoriesRepositoryType {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({
    name,
    description
  }: CategoryConstructor) {
    const category = this.repository.create({
      name,
      description
    });
  
    await this.repository.save(category);
  }

  async list() {
    return await this.repository.find();
  }

  async findByID(id?: string) {
    return await this.repository.findOne({
      where: {
        id
      }
    });
  }

  async findByName(name?: string) {
    return await this.repository.findOne({
      where: {
        name
      }
    });
  }
}