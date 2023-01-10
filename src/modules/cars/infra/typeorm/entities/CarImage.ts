import { PrimaryColumn, Entity, Column, CreateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export type CarsImageConstructor = {
  car_id: string;
  image_name: string;
}

@Entity("cars_image")
export class CarImage {
  @PrimaryColumn()
    id: string;

  @Column()
    car_id: string;

  @Column()
    image_name: string;
    
  @CreateDateColumn()
    created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}