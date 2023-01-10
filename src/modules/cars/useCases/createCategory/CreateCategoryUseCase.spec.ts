import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@errors/AppError";
import { CategoryConstructor } from "../../infra/typeorm/entities/Category";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("Should be able to create a new category", async() => {
    const createCategoryMethod = jest.spyOn(createCategoryUseCase, "execute");

    const category: CategoryConstructor = {
      name: "Category test",
      description: "Category description test"
    };

    await createCategoryUseCase.execute(category);

    expect(createCategoryMethod).toBeCalled();
    
    const categoryCreated = await categoriesRepositoryInMemory.findByName("Category test");

    expect(categoryCreated).not.toBeUndefined();
    expect(categoryCreated).toHaveProperty("id");
  });

  it("Should not be able to create a duplicated category", async() => {
    const createCategoryMethod = jest.spyOn(createCategoryUseCase, "execute");

    const category: CategoryConstructor = {
      name: "Category test",
      description: "Category description test"
    };

    await createCategoryUseCase.execute(category);

    expect(async() => {
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);

    expect(createCategoryMethod).toBeCalledTimes(2);
    expect(createCategoryMethod).toThrowError();
  });
});