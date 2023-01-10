import { AppError } from "@errors/AppError";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { UserConstructor } from "../../infra/typeorm/entities/User";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });


  it("Should be able to authenticate a useer", async() => {
    const authenticateMethod = jest.spyOn(authenticateUserUseCase, "execute");

    const user: UserConstructor = {
      driver_license: "00123",
      email: "test@user.com",
      password: "1234",
      name: "test"
    };

    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(authenticateMethod).toBeCalled();
    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate a non-existent user", async() => {
    const authenticateMethod = jest.spyOn(authenticateUserUseCase, "execute");
    
    const user: UserConstructor = {
      driver_license: "00123",
      email: "test@user.com",
      password: "1234",
      name: "test"
    };

    expect(async() => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: user.password
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(authenticateMethod).toBeCalled();
  });

  it("Should not be able to authenticate with incorrect password", async() => {
    const authenticateMethod = jest.spyOn(authenticateUserUseCase, "execute");
    
    const user: UserConstructor = {
      driver_license: "00123",
      email: "test@user.com",
      password: "1234",
      name: "test"
    };

    await createUserUseCase.execute(user);
    expect(async() => {
      await authenticateUserUseCase.execute({
        email: user.email,
        password: "wrong"
      });
    }).rejects.toBeInstanceOf(AppError);

    expect(authenticateMethod).toBeCalled();
  });
});