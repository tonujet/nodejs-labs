export class CreateUserDto{

    username: string;

    email: string;

    age: number;

    info?: string;

    address?: {
        city: string,
        street: string,
    };
}