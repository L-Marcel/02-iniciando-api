import { inject, injectable } from "tsyringe";
import { CarsRepositoryType } from "../../infra/typeorm/repositories/CarsRepository";

type ListCarsUseCaseParams = {
  category_id?: string;
  brand?: string;
  name?: string;
};

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: CarsRepositoryType
  ) {}
  
  async execute({
    brand,
    category_id,
    name
  }: ListCarsUseCaseParams) {
    return await this.carsRepository.listAvailable({
      brand,
      category_id,
      name
    });
  }
}