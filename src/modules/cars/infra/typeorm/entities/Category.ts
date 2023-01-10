import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export type CategoryConstructor = {
  description: string;
  name: string;
};

@Entity("categories")
export class Category {
  @PrimaryColumn()
    id: string;

  @Column()
    name: string;

  @Column()
    description: string;

  @CreateDateColumn()
    created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}