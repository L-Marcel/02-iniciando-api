import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

export const specificationRepository = SpecificationsRepository.getInstance();
export const listSpecificationsUseCase = new ListSpecificationsUseCase(specificationRepository);
export const listSpecificationsController = new ListSpecificationsController(listSpecificationsUseCase);