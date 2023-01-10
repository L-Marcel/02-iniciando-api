import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CarConstructor } from "../../infra/typeorm/entities/Car";
import { CreateCarUseCase } from "../createCar/CreateCarUseCase";

let listCarsUseCars: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

const cars: CarConstructor[] = [{
  brand: "abc",
  category_id: null,
  daily_rate: 5,
  description: "test",
  fine_amount: 5,
  license_plate: "ADCe-540",
  name: "test2"
},
{
  brand: "abc",
  category_id: null,
  daily_rate: 5,
  description: "test",
  fine_amount: 5,
  license_plate: "ADCf-540",
  name: "test3"
},
{
  brand: "123",
  category_id: "123",
  daily_rate: 5,
  description: "test",
  fine_amount: 5,
  license_plate: "ADCh-540",
  name: "test3"
}];

describe("List cars", () => {
  beforeEach(async() => {
    carsRepositoryInMemory =  new CarsRepositoryInMemory();
    listCarsUseCars = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);

    for(const c in cars) {
      await createCarUseCase.execute(cars[c]);
    }
  });

  it("Should be able to list all available cars", async() => {
    const listCarsMethod = jest.spyOn(listCarsUseCars, "execute");

    const newCars = await listCarsUseCars.execute({});

    expect(listCarsMethod).toBeCalled();
    expect(newCars).toHaveLength(3);
    
    expect(newCars.every((newCar) => 
      !!cars.find(car => car.license_plate === newCar.license_plate))
    ).toBe(true);
  });

  it("Should be able to list all available cars by brand", async() => {
    const listCarsMethod = jest.spyOn(listCarsUseCars, "execute");

    const newCars = await listCarsUseCars.execute({
      brand: "123"
    });

    expect(listCarsMethod).toBeCalled();
    expect(newCars).toHaveLength(1);
    
    expect(newCars.every((newCar) => 
      !!cars.find(car => car.license_plate === newCar.license_plate && newCar.brand === "123"))
    ).toBe(true);
  });

  it("Should be able to list all available cars by name", async() => {
    const listCarsMethod = jest.spyOn(listCarsUseCars, "execute");

    const newCars = await listCarsUseCars.execute({
      name: "test3"
    });

    expect(listCarsMethod).toBeCalled();
    expect(newCars).toHaveLength(2);
    
    expect(newCars.every((newCar) => 
      !!cars.find(car => car.license_plate === newCar.license_plate && newCar.name === "test3"))
    ).toBe(true);
  });

  it("Should be able to list all available cars by category", async() => {
    const listCarsMethod = jest.spyOn(listCarsUseCars, "execute");

    const newCars = await listCarsUseCars.execute({
      category_id: "123"
    });

    expect(listCarsMethod).toBeCalled();
    expect(newCars).toHaveLength(1);
    
    expect(newCars.every((newCar) => 
      !!cars.find(car => car.license_plate === newCar.license_plate && newCar.category_id === "123"))
    ).toBe(true);
  });
});