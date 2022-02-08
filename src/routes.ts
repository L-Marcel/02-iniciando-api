import express from "express";
//import { getError } from "./utils/errors";

const routes = express.Router();

routes.get("/", (req: Req, res: Res) => {
  //return getError(res, 400, "Error example");
  return res.json({
    message: "Hello world!!!",
    create_at: new Date()
  });
});

export default routes;