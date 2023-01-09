import { injectable, inject } from "tsyringe";
import { UsersRepositoryType } from "../../repositories/UsersRespository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface AuthenticateResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

interface AuthenticateRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryType
  ) {}

  async execute({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = sign({}, String(process.env.TOKEN_SECRET), {
      subject: user.id,
      expiresIn: "1d"
    });

    return {
      user: {
        email: user.email,
        name: user.name
      },
      token
    };
  }
}