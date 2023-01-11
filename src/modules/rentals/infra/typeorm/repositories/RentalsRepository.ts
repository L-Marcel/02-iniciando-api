import { Rental, RentalConstructor } from "../entities/Rental";
import { Repository } from "typeorm";

export type RentalsRepositoryType = {
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
  create(data: RentalConstructor): Promise<Rental>;
};

export class RentalsRepository implements RentalsRepositoryType {
  private repository: Repository<Rental>;
  
  async findOpenRentalByCar(car_id: string) {
    return await this.repository.findOne({
      where: {
        car_id
      }
    });
  }

  async findOpenRentalByUser(user_id: string) {
    return await this.repository.findOne({
      where: {
        user_id
      }
    });
  }

  async create({
    car_id,
    expected_return_date,
    user_id
  }: RentalConstructor) {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id
    });

    await this.repository.save(rental);

    return rental;
  }
}