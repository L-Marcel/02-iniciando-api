import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Category } from "./Category";
import { Specification } from "./Specification";

export type CarConstructor = {
  description: string;
  name: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string | null;
  specifications?: Specification[];
  id?: string;
};

@Entity("cars")
export class Car {
  @PrimaryColumn()
    id: string;

  @Column()
    name: string;

  @Column()
    description: string;

  @Column()
    daily_rate: number;

  @Column()
    available: boolean;

  @Column()
    license_plate: string;

  @Column()
    fine_amount: number;

  @Column()
    brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
    category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({ 
    name: "specifications_cars",
    joinColumns: [{
      name: "car_id"
    }],
    inverseJoinColumns: [{
      name: "specification_id"
    }]
  })
    specifications: Specification[];

  @Column()
    category_id: string | null;

  @CreateDateColumn()
    created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuid();
      this.available = true;
    }
  }
}