import { container } from "tsyringe";

import { CategoriesRepository, CategoriesRepositoryType } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationsRepositoryType, SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { UsersRepository, UsersRepositoryType } from "@modules/accounts/infra/typeorm/repositories/UsersRespository";
import { CarsRepositoryType, CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CarsImagesRepositoryType, CarsImagesRepository } from "../../modules/cars/infra/typeorm/repositories/CarsImageRepository";
import { RentalsRepositoryType, RentalsRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { DateProviderType, DayjsDateProvider } from "./providers/DayjsProvider/index";

container.registerSingleton<CategoriesRepositoryType>("CategoriesRepository", CategoriesRepository);
container.registerSingleton<SpecificationsRepositoryType>("SpecificationsRepository", SpecificationsRepository);
container.registerSingleton<UsersRepositoryType>("UsersRepository", UsersRepository);
container.registerSingleton<CarsRepositoryType>("CarsRepository", CarsRepository);
container.registerSingleton<CarsImagesRepositoryType>("CarsImagesRepository", CarsImagesRepository);
container.registerSingleton<RentalsRepositoryType>("RentalsRepository", RentalsRepository);

container.registerSingleton<DateProviderType>("DateProvider", DayjsDateProvider);

