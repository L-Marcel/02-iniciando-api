import { Specification, SpecificationConstructor } from "../../model/Specification";

export type SpecificationsRepositoryType = {
  findByName(name: string): Specification | undefined;
  list(query?: string): Specification[];
  create(data: SpecificationConstructor): void;
  findByID(id: string): Specification | undefined;
}

export class SpecificationsRepository implements SpecificationsRepositoryType {
  private specifications: Specification[] = [];

  private static INSTANCE: SpecificationsRepository;
  private constructor() {
    this.specifications = [];
  }

  static getInstance() {
    if(!this.INSTANCE) {
      this.INSTANCE = new SpecificationsRepository();
    }

    return this.INSTANCE;
  }


  create({
    name,
    description
  }: SpecificationConstructor) {
    const newSpecification = new Specification({
      name,
      description
    });
  
    this.specifications.push(newSpecification);
  }

  list() {
    return this.specifications;
  }

  findByID(id?: string) {
    return this.specifications.find(
      (specification) => specification.id === id
    );
  }

  findByName(name?: string) {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
}