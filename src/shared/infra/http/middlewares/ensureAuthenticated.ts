import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRespository";
import { AppError } from "@errors/AppError";

interface TokenPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [,token] = authHeader.split(" ");

  try {
    const { sub: user_id  } = verify(token, String(process.env.TOKEN_SECRET)) as TokenPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if(!user) {
      throw new AppError("User does not exists", 401);
    }

    req.user = {
      id: user.id
    };

    next();
  } catch(error) {
    throw new AppError("Token invalid!", 401);
  }
}