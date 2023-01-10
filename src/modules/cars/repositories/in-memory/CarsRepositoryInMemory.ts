import { CarsRepositoryType } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { Car, CarConstructor } from "../../infra/typeorm/entities/Car";
import { ListAvailableParams } from "../../infra/typeorm/repositories/CarsRepository";

export class CarsRepositoryInMemory implements CarsRepositoryType {
  cars: Car[] = [];

  async create(data: CarConstructor) {
    const car = new Car();

    Object.assign(car, {
      ...data,
      created_at: new Date()
    });
  
    this.cars.push(car);
    
    return car;
  }

  async findByLicensePlate(license_plate: string) {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findByName(name: string) {
    return this.cars.find(car => car.name === name);
  }

  async listAvailable({
    brand, 
    category_id,
    name
  }: ListAvailableParams) {
    return this.cars
      .filter(car => car.available === true)
      .filter(car => (!brand) || car.brand === brand)
      .filter(car => (!category_id) || car.category_id === category_id)
      .filter(car => (!name) || car.name === name);
  }

  async findById(id: string) {
    return this.cars.find(car => car.id === id);
  }
}