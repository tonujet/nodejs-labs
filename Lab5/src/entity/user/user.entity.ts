import { IsInt, Min, IsString, Length, ValidateIf } from "class-validator";

class UserEntity {
    @ValidateIf(o => o.id)
    @IsInt()
    @Min(0)
    id?: number;

    @IsString()
    @Length(3, 50)
    username: string;

    @IsString()
    name: string;
}

export { UserEntity };
