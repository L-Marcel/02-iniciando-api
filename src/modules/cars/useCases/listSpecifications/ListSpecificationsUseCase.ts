import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: SpecificationsRepository
  ) {}

  async execute() {
    const specifications = await this.specificationsRepository.list();
    return specifications;
  }
}