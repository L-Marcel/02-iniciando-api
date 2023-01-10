import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export type UserConstructor = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

@Entity("users")
export class User {
  @PrimaryColumn()
    id: string;
  
  @Column()
    name: string;

  @Column()
    email: string;

  @Column()
    password: string;

  @Column()
    driver_license: string;
  
  @Column()
    is_admin: boolean;

  @Column()
    avatar: string;

  @CreateDateColumn()
    created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}