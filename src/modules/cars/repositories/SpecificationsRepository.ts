import { Specification, SpecificationConstructor } from "../entities/Specification";
import { Repository, getRepository } from "typeorm";

export type SpecificationsRepositoryType = {
  findByName(name: string): Promise<Specification | undefined>;
  list(query?: string): Promise<Specification[]>;
  create(data: SpecificationConstructor): Promise<void>;
  findByID(id: string): Promise<Specification | undefined>;
}

export class SpecificationsRepository implements SpecificationsRepositoryType {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description
  }: SpecificationConstructor) {
    const specification = this.repository.create({
      name,
      description
    });

    await this.repository.save(specification);
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