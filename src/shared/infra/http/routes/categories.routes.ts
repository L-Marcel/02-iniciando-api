import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { upload } from "@config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

const uploadCategories = multer(upload("./temp"));

categoriesRoutes.post(
  "/", 
  ensureAuthenticated,
  ensureAdmin, 
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/import", uploadCategories.single("file"), importCategoryController.handle);

export {
  categoriesRoutes
};