import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "../../../../errors/AppError";
import dayjs from "dayjs";
import { DayjsDateProvider } from "../../../../shared/container/providers/DayjsProvider/index";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsProvider: DayjsDateProvider;

const futureDateTime = dayjs().add(1, "days").toDate();

describe("Create rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsProvider);
  });

  it("Should be able to create a new rental", async() => {
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: futureDateTime
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if there is another open to the same car", async() => {
    const createRentalMethod = jest.spyOn(createRentalUseCase, "execute");

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "1212123",
      expected_return_date: futureDateTime
    });

    expect(async() => {
      await createRentalUseCase.execute({
        user_id: "12345",
        car_id: "121212",
        expected_return_date: futureDateTime
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(createRentalMethod).toBeCalledTimes(2);
  });

  it("Should not be able to create a new rental if there is another open to the same user", async() => {
    const createRentalMethod = jest.spyOn(createRentalUseCase, "execute");

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: futureDateTime
    });

    expect(async() => {
      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121212",
        expected_return_date: futureDateTime
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(createRentalMethod).toBeCalledTimes(2);
  });

  it("Should not be able to create a new rental if there is another open to the same user", async() => {
    const createRentalMethod = jest.spyOn(createRentalUseCase, "execute");

    await createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: futureDateTime
    });

    expect(async() => {
      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121212",
        expected_return_date: futureDateTime
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(createRentalMethod).toBeCalledTimes(2);
  });

  it("Should not be able to create a new rental with invalid returning time", async() => {
    const createRentalMethod = jest.spyOn(createRentalUseCase, "execute");

    expect(async() => {
      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121212",
        expected_return_date: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(createRentalMethod).toBeCalledTimes(1);
  });
});