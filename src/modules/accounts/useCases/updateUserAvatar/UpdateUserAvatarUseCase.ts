import { injectable, inject } from "tsyringe";
import { UsersRepositoryType } from "../../repositories/UsersRespository";
import { AppError } from "../../../../errors/AppError";
import { deleteFile } from "../../../../utils/file";

interface UpdateUserAvatarRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryType
  ) {}

  async execute({ user_id, avatar_file }: UpdateUserAvatarRequest) {
    const user = await this.usersRepository.findById(user_id);
   
    if(!user) {
      throw new AppError("User not found", 404);
    }

    if(user.avatar) {
      await deleteFile(`./temp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;
    await this.usersRepository.create(user);
  }
}