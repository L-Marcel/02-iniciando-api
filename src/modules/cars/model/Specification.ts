import { getUUID } from "../../../utils/getUUID";

export type SpecificationConstructor = {
  description: string;
  name: string;
};

export class Specification {
  id: string;
  createdAt: Date;
  name: string;
  description: string;

  constructor({
    description,
    name
  }: SpecificationConstructor) {
    this.id = getUUID();
    this.createdAt = new Date();
    this.name = name;
    this.description = description;
  }
}