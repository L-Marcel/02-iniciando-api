import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { getUUID } from "../../../utils/getUUID";

export type SpecificationConstructor = {
  description: string;
  name: string;
};

@Entity("specifications")
export class Specification {
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