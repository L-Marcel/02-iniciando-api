import "reflect-metadata";
import getConnection from "./database";
import "@shared/container";
import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./shared/infra/http/routes/index.routes";
import { Response, Request } from "express";
import { AppError } from "@errors/AppError";
import { createAdminIfNotExist } from "database/seed/admin";

export async function getApp() {
  const connection = await getConnection(process.env.NODE_ENV === "test"? 5433:5432);

  await connection.runMigrations();
  await createAdminIfNotExist({
    log: false
  });

  const app = express();

  app.use(cors());
  app.use(json());
  
  app.use("/", router);
  
  app.use((err: Error, req: Request, res: Response) => {
    if(err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message
      });
    }
  
    console.log(err);
  
    return res.status(500).json({
      status: "error",
      message: `Internal Server Error - ${err.message}`
    });
  });

  return {
    app,
    connection
  };
}