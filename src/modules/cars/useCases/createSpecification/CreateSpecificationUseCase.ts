import { SpecificationConstructor } from "../../model/Specification";
import { ApiError } from "../../../../errors/ApiError";
import { SpecificationsRepositoryType } from "../../repositories/implementations/SpecificationsRepository";

export class CreateSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepositoryType) {}

  execute(
    { name, description }: SpecificationConstructor
  ) {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name);

    if(specificationAlreadyExists) {
      throw new ApiError(400, "Specification already exists!");
    }
  
    this.specificationsRepository.create({
      name,
      description
    });
  }
}