import { inject, injectable } from "tsyringe";
import { UsersRepositoryType } from "../../infra/typeorm/repositories/UsersRespository";
import { UserConstructor } from "../../infra/typeorm/entities/User";
import { genSalt, hash } from "bcrypt";
import { AppError } from "@errors/AppError";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryType
  ) {}
  
  async execute({
    driver_license,
    name,
    password,
    email
  }: UserConstructor, isAdmin = false) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email); 

    if(userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const salt = await genSalt(8);
    const passwordHash = await hash(password, salt);

    if(isAdmin) {
      await this.usersRepository.createAdmin({
        driver_license,
        name,
        password: passwordHash,
        email,
      });
    } else {
      await this.usersRepository.create({
        driver_license,
        name,
        password: passwordHash,
        email,
      });
    }
  }
}