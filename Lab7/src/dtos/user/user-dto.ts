import { Expose, Type } from "class-transformer";
import { UserAddressDto } from "@dto/user/user-address-dto.js";

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
}
