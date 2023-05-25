import { UserRepository } from "@repository/user.repository.js";
import { CreateUserDto } from "@dto/user/create-user-dto.js";

export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  get(id: string) {
    return this.userRepo.get(id);
  }
  getWithPosts(id: string) {
    return this.userRepo.getWithPosts(id);
  }

  getAll() {
    return this.userRepo.getAll();
  }

  getAllWithPosts() {
    return this.userRepo.getAllWithPosts();
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepo.create(createUserDto);
  }

  update(id: string, updateUserDto: CreateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }

  delete(id: string) {
    return this.userRepo.delete(id);
  }
}
