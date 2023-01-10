import { UserConstructor, User } from "../../infra/typeorm/entities/User";
import { UsersRepositoryType } from "../../infra/typeorm/repositories/UsersRespository";

export class UsersRepositoryInMemory implements UsersRepositoryType {
  users: User[] = [];

  async create({ 
    name, 
    driver_license, 
    email, 
    password 
  }: UserConstructor): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name, 
      driver_license, 
      email, 
      password
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async hasAdmin(): Promise<boolean> {
    return this.users.some(user => user.is_admin);
  }

  async createAdmin({
    name, 
    driver_license, 
    email, 
    password 
  }: UserConstructor): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name, 
      driver_license, 
      email, 
      password,
      is_admin: true
    });

    this.users.push(user);
  }
}