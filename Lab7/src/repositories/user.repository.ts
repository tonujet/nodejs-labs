import {
  Equal,
  FindManyOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  ILike,
  IsNull,
  Not,
  Raw,
  Repository,
} from "typeorm";
import { UserEntity } from "@entity/user.entity.js";
import { CreateUserDto } from "@dto/user/create-user.dto.js";
import { UniquenessException } from "@exception/entity/uniqueness.exception.js";
import { UserMapper } from "@mapper/user.mapper.js";
import { UserDto } from "@dto/user/user.dto.js";
import { GetAllUserParamsType } from "@type/user/get-all-user-params.type.js";
import { GetAllWhereOptionsParamType } from "@type/user/get-all-where-options-param.type.js";
import { EntityNotFoundException } from "@exception/entity/entity-not-found.exception.js";

export class UserRepository {
  constructor(
    private readonly userDao: Repository<UserEntity>,
    private readonly userMapper: UserMapper
  ) {}

  get(id: string): Promise<UserDto> {
    return this.userDao
      .findOneByOrFail({ id })
      .then(this.userMapper.toDto)
      .catch(() => {
        throw new EntityNotFoundException("user", "id", id);
      });
  }

  getWithPosts(id: string): Promise<UserDto> {
    return this.userDao
      .findOneOrFail({
        where: { id },
        relations: { posts: true },
      })
      .then(this.userMapper.toDto)
      .catch(() => {
        throw new EntityNotFoundException("user", "id", id);
      });
  }

  getByUsername(username: string): Promise<UserDto> {
    return this.userDao
      .findOneByOrFail({ username })
      .then(this.userMapper.toDto)
      .catch(() => {
        throw new EntityNotFoundException("user", "username", username);
      });
  }

  private whereOptionsForGetAll({
    search,
    age,
    city,
    userPostTitle,
  }: GetAllWhereOptionsParamType): FindOptionsWhere<UserEntity>[] {
    const searchOption = search ? ILike(`%${search}%`) : undefined;
    const mainWhereOptions = {
      posts: {
        title: userPostTitle ? ILike(`${userPostTitle}`) : undefined,
      },
      age: age ? Equal(age) : undefined,
      address: city
        ? Raw(() => `address::json ->> 'city' ILIKE :city`, { city })
        : undefined,
      id: Not(IsNull()),
    };
    return [
      {
        ...mainWhereOptions,
        username: searchOption,
      },
      {
        ...mainWhereOptions,
        email: searchOption,
      },
      {
        ...mainWhereOptions,
        info: searchOption,
      },
    ];
  }

  private findOptionsForGetAll(
    { take = 0, skip = 0, ...params }: GetAllUserParamsType,
    relations?: FindOptionsRelations<UserEntity>
  ): FindManyOptions<UserEntity> {
    return {
      where: this.whereOptionsForGetAll(params),
      relations,
      take,
      skip,
    };
  }

  getAll(params: GetAllUserParamsType): Promise<UserDto[]> {
    return this.userDao
      .find(this.findOptionsForGetAll(params))
      .then(users => this.userMapper.toDtoArr(users));
  }

  getAllWithPosts(params: GetAllUserParamsType): Promise<UserDto[]> {
    return this.userDao
      .find(this.findOptionsForGetAll(params, { posts: true }))
      .then(users => this.userMapper.toDtoArr(users));
  }

  create(createUserDto: CreateUserDto): Promise<UserDto> {
    return this.checkPropUniqueness(createUserDto)
      .then(() => this.userDao.save(createUserDto))
      .then(this.userMapper.toDto);
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
    const errs: UniquenessException[] = [];
    if (email) await this.isEmailUnique(email, errs);
    if (username) await this.isUsernameUnique(username, errs);
    if (errs.length) throw errs;
    return userDto;
  }

  private isEmailUnique(email: string, errs: UniquenessException[]) {
    return this.userDao
      .exist({ where: { email } })
      .then(
        isExist =>
          isExist && errs.push(new UniquenessException("email", email, "user"))
      );
  }

  private isUsernameUnique(username: string, errs: UniquenessException[]) {
    return this.userDao
      .exist({ where: { username } })
      .then(
        isExist =>
          isExist &&
          errs.push(new UniquenessException("username", username, "user"))
      );
  }
}
