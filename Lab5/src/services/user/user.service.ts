import {UserRepository} from "../../repositories/repositories.js";
import {CreateUserDto} from "../../dtos/user/create-user-dto.js";


class UserService {
    constructor(
        private readonly userRepo: UserRepository
    ) {}

    get(id: number) {
        return this.userRepo.get(id);
    };

    getAll() {
        return this.userRepo.getAll();
    };

    create(user: CreateUserDto) {
        return this.userRepo.create(user);
    };

    delete(id: number) {
        return this.userRepo.delete(id);
    };

    update(userProps: CreateUserDto, id: number) {
        return this.userRepo.update(userProps, id);
    };

}


export {UserService};