import { container } from "tsyringe";
import { CategoriesRepository, CategoriesRepositoryType } from "../../modules/cars/repositories/CategoriesRepository";
import { SpecificationsRepositoryType, SpecificationsRepository } from "../../modules/cars/repositories/SpecificationsRepository";
import { UsersRepository, UsersRepositoryType } from "../../modules/accounts/repositories/UsersRespository";

container.registerSingleton<CategoriesRepositoryType>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<SpecificationsRepositoryType>("SpecificationsRepository", SpecificationsRepository);
container.registerSingleton<UsersRepositoryType>("UsersRepository", UsersRepository);