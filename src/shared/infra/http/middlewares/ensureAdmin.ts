import { NextFunction, Response, Request } from "express";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRespository";
import { AppError } from "../../../../errors/AppError";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if(!user?.is_admin) {
    throw new AppError("Unauthorized", 401);
  }

  next();
}