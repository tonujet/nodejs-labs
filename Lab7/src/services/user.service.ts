import { UserRepository } from "@repository/user.repository.js";
import { CreateUserDto } from "@dto/user/create-user.dto.js";
import { GetAllUserQueryType } from "@type/user/get-all-user-query.type.js";
import { PageService } from "@service/page.service.js";
import { GetAllUserParamsType } from "@type/user/get-all-user-params.type.js";

export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly pageService: PageService
  ) {}

  get(id: string) {
    return this.userRepo.get(id);
  }
  getWithPosts(id: string) {
    return this.userRepo.getWithPosts(id);
  }

  getAll(query: GetAllUserQueryType) {
    return this.userRepo.getAll(this.calcGetAllParams(query));
  }

  getAllWithPosts(query: GetAllUserQueryType) {
    return this.userRepo.getAllWithPosts(this.calcGetAllParams(query));
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

  private calcGetAllParams({
    take,
    page,
    ...params
  }: GetAllUserQueryType): GetAllUserParamsType {
    const skip = this.pageService.calcSkip(page, take);
    return { take, skip, ...params };
  }
}
