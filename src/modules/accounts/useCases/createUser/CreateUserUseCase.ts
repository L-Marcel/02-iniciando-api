import { inject, injectable } from "tsyringe";
import { UsersRepositoryType } from "../../repositories/UsersRespository";
import { UserConstructor } from "../../entities/User";
import { hash } from "bcrypt";

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
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      driver_license,
      name,
      password: passwordHash,
      email
    });
  }
}