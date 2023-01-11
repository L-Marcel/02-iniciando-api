import { Column, PrimaryColumn, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

export type RentalConstructor = {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
}

@Entity("rentals")
export class Rental {
  @PrimaryColumn()
    id: string;

  @Column()
    car_id: string;

  @Column()
    user_id: string;

  @Column()
    start_date: Date;

  @Column()
    end_date: Date;

  @Column()
    expected_return_date: Date;

  @Column()
    total: number;

  @CreateDateColumn()
    created_at: Date;

  @UpdateDateColumn()
    updated_at: Date;
  
  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}