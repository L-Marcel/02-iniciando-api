import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "../../../../errors/AppError";
import { SpecificationsRepositoryType } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { SpecificationRepositoryInMemory } from "../../repositories/in-memory/SpecificationRepositoryInMemory";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryType;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory, 
      specificationsRepositoryInMemory
    );
  });

  it("Should not be able to add a new specification to a non-existent car", async() => {
    const createCarSpecificationMethod = jest.spyOn(createCarSpecificationUseCase, "execute");

    const car_id = "1234";
    const specifications_id = ["54321"];

    expect(async() => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(createCarSpecificationMethod).toBeCalled();
  });

  it("Should be able to add a new specification to the car", async() => {
    const createCarSpecificationMethod = jest.spyOn(createCarSpecificationUseCase, "execute");
    
    const car = await carsRepositoryInMemory.create({
      brand: "Brand",
      category_id: "123",
      daily_rate: 1000,
      description: "Car for tests",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Car",
    });
  
    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test"
    });

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id: [specification.id]
    });

    expect(createCarSpecificationMethod).toBeCalled();
    expect(specificationsCars.specifications).toHaveLength(1);
  });
});