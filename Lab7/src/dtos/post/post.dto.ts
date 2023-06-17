import { Expose, Type } from "class-transformer";
import { UserDto } from "@dto/user/user.dto.js";

export class PostDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  text: string;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  dateCreation: Date;
}
