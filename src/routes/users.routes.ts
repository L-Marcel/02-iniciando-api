import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import multer from "multer";
import { upload } from "../config/upload";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateController = new AuthenticateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(upload("./temp/avatar"));

usersRoutes.post("/", createUserController.handle);
usersRoutes.post("/auth/sessions", authenticateController.handle);

usersRoutes.patch(
  "/avatar", 
  ensureAuthenticated, 
  uploadAvatar.single("avatar"), 
  updateUserAvatarController.handle
);

export { usersRoutes };