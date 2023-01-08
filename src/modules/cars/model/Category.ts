import { getUUID } from "../../../utils/getUUID";

export type CategoryConstructor = {
  description: string;
  name: string;
};

export class Category {
  id: string;
  createdAt: Date;
  name: string;
  description: string;

  constructor({
    description,
    name
  }: CategoryConstructor) {
    this.id = getUUID();
    this.createdAt = new Date();
    this.name = name;
    this.description = description;
  }
}