import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsNumber,
  ValidateNested,
  MaxLength,
  Max,
} from "class-validator";
import { Type } from "class-transformer";
import { UserAddressDto } from "./user-address.dto.js";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  @Max(150)
  age: number;

  @IsString()
  info?: string;

  @ValidateNested()
  @Type(() => UserAddressDto)
  address?: UserAddressDto;
}
