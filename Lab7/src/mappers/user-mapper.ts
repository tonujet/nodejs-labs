import { UserEntity } from "@entity/user.entity.js";
import { UserDto } from "@dto/user/user-dto.js";
import { plainToInstance } from "class-transformer";

export class UserMapper {
  toDto(user: UserEntity): UserDto {
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }

  toDtoArr(users: UserEntity[]): UserDto[] {
    return users.map(this.toDto);
  }

  toEntity(userDto: UserDto): UserEntity {
    return { ...userDto } as UserEntity;
  }

  toEntityArr(userDtos: UserDto[]): UserEntity[] {
    return userDtos.map(this.toEntity);
  }
}
