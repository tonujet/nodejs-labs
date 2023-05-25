import { Repository } from "typeorm";
import { UserEntity } from "@entity/user.entity.js";
import { CreateUserDto } from "@dto/user/create-user-dto.js";
import { UniquenessError } from "@exception/entity/uniqueness-error.js";
import { UserMapper } from "../mappers/user-mapper.js";
import { UserDto } from "@dto/user/user-dto.js";

export class UserRepository {
  constructor(
    private readonly userDao: Repository<UserEntity>,
    private readonly userMapper: UserMapper
  ) {}

  get(id: string): Promise<UserDto> {
    return this.userDao.findOneByOrFail({ id }).then(this.userMapper.toDto);
  }

  getByUsername(username: string): Promise<UserDto> {
    return this.userDao
      .findOneByOrFail({ username })
      .then(this.userMapper.toDto);
  }

  getAll(): Promise<UserDto[]> {
    return this.userDao.find().then(users => this.userMapper.toDtoArr(users));
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    await this.checkPropUniqueness(createUserDto);
    return this.userDao.save(createUserDto).then(this.userMapper.toDto);
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<UserDto> {
    await this.checkPropUniqueness(updateUserDto);
    const currUser = await this.get(id);
    const newUser = { ...currUser, ...updateUserDto };
    await this.userDao.update({ id }, newUser);
    return this.get(id);
  }

  async delete(id: string): Promise<UserDto> {
    const deletedUser = await this.get(id);
    await this.userDao.delete({ id });
    return deletedUser;
  }

  private async checkPropUniqueness(userDto: CreateUserDto) {
    const { username, email } = userDto;
    let errs: string[] = [];
    if (email) await this.isEmailUnique(email, errs);
    if (username) await this.isUsernameUnique(username, errs);
    if (errs.length) throw new UniquenessError(errs);
  }

  private async isEmailUnique(email: string, errs: string[]) {
    const isExist = await this.userDao.exist({ where: { email } });
    if (isExist) errs.push(`email => User with email: ${email} already exist`);
  }

  private async isUsernameUnique(username: string, errs: string[]) {
    const isExist = await this.userDao.exist({ where: { username } });
    if (isExist)
      errs.push(`username => User with username: ${username} already exist`);
  }
}
