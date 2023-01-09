import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";
import { AppError } from "../../../../errors/AppError";
export class UpdateUserAvatarController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const avatar_file = req.file?.filename;

    if(!avatar_file) {
      throw new AppError("Avatar file can't be undefined");
    }

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    await updateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file
    });

    return res.status(204).send();
  }
}