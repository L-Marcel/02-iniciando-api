import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateController = new AuthenticateUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/auth/sessions", authenticateController.handle);

export { usersRoutes };