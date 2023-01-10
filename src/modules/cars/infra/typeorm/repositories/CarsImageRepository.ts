import { CarImage, CarsImageConstructor } from "../entities/CarImage";
import { Repository, getRepository } from "typeorm";

export type CarsImagesRepositoryType = {
  create(data: CarsImageConstructor): Promise<CarImage>;
};

export class CarsImagesRepository implements CarsImagesRepositoryType {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }
  
  async create({
    car_id,
    image_name
  }: CarsImageConstructor) {
    const carImage = this.repository.create({
      car_id,
      image_name
    });

    await this.repository.save(carImage);

    return carImage;
  }
}