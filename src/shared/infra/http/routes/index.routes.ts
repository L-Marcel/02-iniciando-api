import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { swaggerRoutes } from "./swagger.routes";
import { usersRoutes } from "./users.routes";
import { carsRoutes } from "./cars.routes";
import { rentalsRoutes } from "./rental.routes";

const router = Router();

router.use("/api-docs", swaggerRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRoutes);

export {
  router
};