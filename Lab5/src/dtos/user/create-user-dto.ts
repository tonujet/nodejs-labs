import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;
}
