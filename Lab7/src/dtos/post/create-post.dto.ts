import { IsString, IsUUID, IsNotEmpty } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
