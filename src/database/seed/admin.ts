import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRespository";
import { CreateUserUseCase } from "../../modules/accounts/useCases/createUser/CreateUserUseCase";

export async function createAdminIfNotExist() {
  setTimeout(async() => {
    try {
      console.log("Checking if admin is already created...");
      const usersRepository = new UsersRepository();

      const userAlreadyExists = await usersRepository.hasAdmin();

      if(!userAlreadyExists) {
        console.log("Creating admin...");
        const createUserUseCase = new CreateUserUseCase(usersRepository);
        await createUserUseCase.execute({
          name: "admin",
          email: "admin@rentx.com",
          password: "admin",
          driver_license: "admin_driver_license",
        }, true);

        console.log("Admin was created!");
      } else {
        console.log("Admin already exist!");
      }
    } catch (error) {
      console.log("Error on check admin");
    }
  }, 10 * 1000);
}