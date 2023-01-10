import { CarsRepositoryType } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { inject, injectable } from "tsyringe";
import { CarConstructor } from "../../infra/typeorm/entities/Car";
import { AppError } from "@errors/AppError";

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: CarsRepositoryType
  ) {}
  
  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name
  }: CarConstructor) {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

    if(carAlreadyExists) {
      throw new AppError("Car already exists");
    }

    const car = this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name
    });

    return car;
  }
}