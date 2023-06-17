import { IsNotEmpty, IsString, MinLength, MaxLength } from "class-validator";
import { Expose } from "class-transformer";

export class UserAddressDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(200)
  @Expose()
  city: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  @Expose()
  street: string;
}
