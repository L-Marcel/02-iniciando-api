import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { listCategoriesController } from "../modules/cars/useCases/listCategories";
import { upload } from "../lib/multer";
import { importCategoryController } from "../modules/cars/useCases/importCategory";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (req: Req, res: Res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (req: Req, res: Res) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), async(req: Req, res: Res) => {
  return await importCategoryController.handle(req, res);
});

export {
  categoriesRoutes
};