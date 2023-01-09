import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { swaggerRoutes } from "./swagger.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use("/api-docs", swaggerRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);

export {
  router
};