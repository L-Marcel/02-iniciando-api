import { Router } from "express";
import { createCategoryController } from "../modules/cars/useCases/createCategory/index";
import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req: Req, res: Res) => {
  return createCategoryController.handle(req, res);
});

specificationsRoutes.get("/", (req: Req, res: Res) => {
  return listSpecificationsController.handle(req, res);
});

export {
  specificationsRoutes
};