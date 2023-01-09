import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { getUUID } from "../../../utils/getUUID";

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
      this.id = getUUID();
    }
  }
}