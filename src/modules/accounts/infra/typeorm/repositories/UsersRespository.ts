import { UserConstructor, User } from "../entities/User";
import { Repository, getRepository } from "typeorm";


export interface UsersRepositoryType {
  create(data: UserConstructor): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  hasAdmin(): Promise<boolean>;
  createAdmin(data: UserConstructor): Promise<void>;
}

export class UsersRepository implements UsersRepositoryType {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async hasAdmin(): Promise<boolean> {
    const admin = await this.repository.findOne({
      where: {
        is_admin: true
      }
    });

    return !!admin;
  }

  async create({
    driver_license,
    name,
    password,
    email,
    avatar,
    id
  }: UserConstructor) {
    const user = this.repository.create({
      driver_license,
      name,
      password,
      email,
      avatar,
      id
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

  async createAdmin({
    driver_license,
    name,
    password,
    email,
    avatar,
    id
  }: UserConstructor) {
    const user = this.repository.create({
      driver_license,
      name,
      password,
      email,
      avatar,
      is_admin: true,
      id
    });

    await this.repository.save(user);
  }
}