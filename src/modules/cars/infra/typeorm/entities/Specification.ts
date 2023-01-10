import { Column, CreateDateColumn, Entity, PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuid } from "uuid";
import { Car } from "./Car";

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
  
  /*@ManyToMany(() => Car)
  @JoinTable({ 
    name: "specifications_cars",
    inverseJoinColumns: [{
      name: "car_id"
    }],
    joinColumns: [{
      name: "specification_id"
    }]
  })
    cars: Car[];*/

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}