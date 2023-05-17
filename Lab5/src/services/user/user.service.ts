import {UserRepository} from "../../repositories/repositories.js";
import {UserEntity} from "../../entity/user/user.entity.js";
import {UserProperties} from "../../common/types/user/user.properties.js";



class UserService {
    constructor(
        private readonly userRepo: UserRepository
    ) {}

    async get(id: number) {
        return await this.userRepo.get(id);
    };

    async getAll() {
        return await this.userRepo.getAll();
    };

    async create(user: UserEntity) {
        return await this.userRepo.create(user);
    };

    async delete(id: number) {
        return await this.userRepo.delete(id);
    };

    async update(properties: UserProperties, id: number) {
        return await this.userRepo.update(properties, id);
    };

}


export {UserService};