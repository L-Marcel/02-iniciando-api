import { inject, injectable } from "tsyringe";
import { UsersRepositoryType } from "../../repositories/UsersRespository";
import { UserConstructor } from "../../entities/User";
import { genSalt, hash } from "bcrypt";
import { AppError } from "../../../../errors/AppError";

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
  }: UserConstructor) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email); 

    if(userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const salt = await genSalt(8);
    const passwordHash = await hash(password, salt);

    await this.usersRepository.create({
      driver_license,
      name,
      password: passwordHash,
      email
    });
  }
}