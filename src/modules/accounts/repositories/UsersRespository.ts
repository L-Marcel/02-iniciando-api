import { UserConstructor, User } from "../entities/User";
import { Repository, getRepository } from "typeorm";


export interface UsersRepositoryType {
  create(data: UserConstructor): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(email: string): Promise<User | undefined>;
}

export class UsersRepository implements UsersRepositoryType {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    driver_license,
    name,
    password,
    email
  }: UserConstructor) {
    const user = this.repository.create({
      driver_license,
      name,
      password,
      email
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({
      where: {
        email
      }
    });
  }

  async findById(id: string) {
    return await this.repository.findOne({
      where: {
        id
      }
    });
  }
}