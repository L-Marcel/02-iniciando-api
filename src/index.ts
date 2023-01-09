import "reflect-metadata";
import "./database";
import "./shared/container";
import express, { json } from "express";
import cors from "cors";
import { router } from "./routes/index.routes";

const app = express();

app.use(cors());
app.use(json());

app.use("/", router);
app.listen(3333);

