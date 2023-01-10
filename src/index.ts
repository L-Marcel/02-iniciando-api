import "reflect-metadata";
import "./database";
import "@shared/container";
import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./shared/infra/http/routes/index.routes";
import { Response, Request, NextFunction } from "express";
import { AppError } from "@errors/AppError";
import { createAdminIfNotExist } from "database/seed/admin";

const app = express();

app.use(cors());
app.use(json());

app.use("/", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
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

createAdminIfNotExist();
app.listen(3333);

