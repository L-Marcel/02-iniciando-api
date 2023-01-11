import { Router } from "express";
import { upload } from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateSpecificationController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImagesController";
import multer from "multer";

const carsRoutes = Router();

const uploadImages = multer(upload("./temp/cars"));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post(
  "/", 
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post(
  "/:id/specifications", 
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/:id/images", 
  ensureAuthenticated,
  ensureAdmin,
  uploadImages.array("files"),
  uploadCarImagesController.handle
);

export { carsRoutes };