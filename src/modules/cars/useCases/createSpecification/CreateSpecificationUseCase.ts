import { AppError } from "@errors/AppError";
import { SpecificationConstructor } from "../../infra/typeorm/entities/Specification";
import { SpecificationsRepositoryType } from "../..//infra/typeorm/repositories/SpecificationsRepository";
import { injectable, inject } from "tsyringe";
@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepositoryType
  ) {}

  async execute(
    { name, description }: SpecificationConstructor
  ) {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if(specificationAlreadyExists) {
      throw new AppError("Specification already exists!");
    }
  
    await this.specificationsRepository.create({
      name,
      description
    });
  }
}