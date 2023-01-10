import { injectable, inject } from "tsyringe";
import { CarsImagesRepositoryType } from "../../infra/typeorm/repositories/CarsImageRepository";

interface UploadCarImageResquet {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: CarsImagesRepositoryType
  ) {}

  async execute({
    car_id,
    images_name
  }: UploadCarImageResquet) {
    await Promise.all(images_name.map(async(image) => {
      await this.carsImagesRepository.create({
        car_id,
        image_name: image
      });
    }));
  }
}