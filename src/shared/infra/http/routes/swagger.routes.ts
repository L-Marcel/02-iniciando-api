import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import swagger from "../../../../swagger.json";

const swaggerRoutes = Router();

swaggerRoutes.use("/", serve, setup(swagger));

export { swaggerRoutes };