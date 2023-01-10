import { inject, injectable } from "tsyringe";
import { CarsRepositoryType } from "../../infra/typeorm/repositories/CarsRepository";
import { AppError } from "../../../../errors/AppError";
import { SpecificationsRepositoryType } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

interface CreateCarSpecificationRequest {
  car_id: string;
  specifications_id: string[];
}


@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: CarsRepositoryType,
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepositoryType
  ) {}

  async execute({
    car_id,
    specifications_id
  }: CreateCarSpecificationRequest) {
    const carExists = await this.carsRepository.findById(car_id);

    if(!carExists) {
      throw new AppError("Car does not exist!");
    }

    const specifications = await this.specificationsRepository.findByIDs(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}