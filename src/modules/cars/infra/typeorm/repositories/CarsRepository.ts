import { Car, CarConstructor } from "../entities/Car";
import { Repository, getRepository } from "typeorm";

export type ListAvailableParams = {
  brand?: string;
  category_id?: string;
  name?: string;
};

export type CarsRepositoryType = {
  create(data: CarConstructor): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findByName(name: string): Promise<Car | undefined>;
  findById(id: string): Promise<Car | undefined>;
  listAvailable(params: ListAvailableParams): Promise<Car[]>;
}

export class CarsRepository implements CarsRepositoryType {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id
  }: CarConstructor) {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string) {
    return this.repository.findOne({ 
      where: {
        license_plate
      }
    });
  }

  async findByName(name: string) {
    return await this.repository.findOne({
      where: {
        name
      }
    });
  }

  async listAvailable({
    brand,
    category_id,
    name
  }: ListAvailableParams): Promise<Car[]> {
    const carSquery = this.repository.createQueryBuilder("c")
      .where("available = :available", {
        available: true,
      });

    if(brand) {
      carSquery.andWhere("brand = :brand", { brand });
    }

    if(category_id) {
      carSquery.andWhere("category_id = :category_id", { category_id });
    }

    if(name) {
      carSquery.andWhere("name = :name", { name });
    }

    return await carSquery.getMany();
  }

  async findById(id: string) {
    return await this.repository.findOne({
      where: {
        id
      }
    });
  }
}