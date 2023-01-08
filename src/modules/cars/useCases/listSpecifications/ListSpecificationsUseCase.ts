import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

export class ListSpecificationsUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) {}

  execute() {
    const specifications = this.specificationsRepository.list();
    return specifications;
  }
}