import { Specification, SpecificationConstructor } from "@modules/cars/infra/typeorm/entities/Specification";
import { SpecificationsRepositoryType } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

export class SpecificationRepositoryInMemory implements SpecificationsRepositoryType {
  specifications: Specification[] = [];

  async findByName(name: string) {
    return this.specifications.find(specification => specification.name === name);
  }
  
  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async create({ description, name }: SpecificationConstructor) {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByID(id: string) {
    return this.specifications.find(specification => specification.id === id);
  }

  async findByIDs(ids: string[]) {
    return this.specifications.filter(specification => ids.includes(specification.id));
  }
}