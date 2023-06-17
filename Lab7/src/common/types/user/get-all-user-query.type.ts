import { Transform } from "class-transformer";
import { IsNumber, IsPositive, IsString, Min } from "class-validator";

export class GetAllUserQueryType {
  @IsString()
  search?: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  @Transform(({ value }) => +value)
  age?: number;

  @IsString()
  city?: string;

  @IsString()
  userPostTitle?: string;

  @Transform(({ value }) => +value)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Min(0)
  take?: number;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  @Transform(({ value }) => +value)
  page?: number;
}
