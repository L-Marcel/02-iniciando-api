import { CreateCarUseCase } from "./CreateCarUseCase";
import { CarsRepositoryType } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CarConstructor } from "../../infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "../../../../errors/AppError";

let carsRepositoryInMemory: CarsRepositoryType;
let createCarUseCase: CreateCarUseCase;

describe("Create car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async() => {
    const createCarMethod = jest.spyOn(createCarUseCase, "execute");
    
    const car: CarConstructor = {
      brand: "Brand",
      category_id: "123",
      daily_rate: 1000,
      description: "Car for tests",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Car",
    };
    
    await createCarUseCase.execute(car);

    expect(createCarMethod).toBeCalled();

    const createdCar = await carsRepositoryInMemory.findByLicensePlate(car.license_plate);

    expect(createdCar).not.toBeUndefined();
    expect(createdCar).toHaveProperty("id");
  });

  it("Should not be able to create a car with a used license plate", async() => {
    const createCarMethod = jest.spyOn(createCarUseCase, "execute");

    const car: CarConstructor = {
      brand: "Brand",
      category_id: "123",
      daily_rate: 1000,
      description: "Car for tests",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Car",
    };
    
    await createCarUseCase.execute(car);

    expect(async() => {
      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);

    expect(createCarMethod).toBeCalledTimes(2);
  });

  it("Should be able to create a car with availability by default", async() => {
    const createCarMethod = jest.spyOn(createCarUseCase, "execute");
    
    const car: CarConstructor = {
      brand: "Brand",
      category_id: "123",
      daily_rate: 1000,
      description: "Car for tests",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Car",
    };
    
    await createCarUseCase.execute(car);

    expect(createCarMethod).toBeCalled();

    const createdCar = await carsRepositoryInMemory.findByLicensePlate(car.license_plate);

    expect(createdCar).not.toBeUndefined();
    expect(createdCar).toHaveProperty("id");
    expect(createdCar?.available).toBe(true);
  });
});