import { Expose, Type } from "class-transformer";
import { UserAddressDto } from "@dto/user/user-address-dto.js";
import { PostDto } from "@dto/post/post-dto.js";

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  age: number;

  @Expose()
  info?: string;

  @Expose()
  @Type(() => UserAddressDto)
  address?: UserAddressDto;

  @Expose()
  @Type(() => PostDto)
  posts?: PostDto[];
}
