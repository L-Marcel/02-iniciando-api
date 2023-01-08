import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

export const specificationRepository = SpecificationsRepository.getInstance();
export const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);
export const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase);