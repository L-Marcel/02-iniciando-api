import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/UsersRespository";

interface TokenPayload {
  sub: string;
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    throw new Error("Token missing");
  }

  const [,token] = authHeader.split(" ");

  try {
    const { sub: user_id  } = verify(token, String(process.env.TOKEN_SECRET)) as TokenPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if(!user) {
      throw new Error("User does not exists");
    }

    next();
  } catch(error) {
    throw new Error("Token invalid!");
  }
}