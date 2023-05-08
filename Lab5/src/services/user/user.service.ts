import {UserRepository} from "../../repositories/repositories";
import {UserEntity} from "../../entity/user/user.entity";
import {UserProperties} from "../../common/types/user/user.properties";


class UserService {
    private readonly userRepository: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepository = userRepo;
    }

    async get(id: number): Promise<UserEntity | undefined > | never {
        return await this.userRepository.get(id);
    };

    async getAll(): Promise<UserEntity[]> {
        return await this.userRepository.getAll();
    };

    async create(user: UserEntity): Promise<UserEntity> {
        return await this.userRepository.create(user);
    };

    async delete(id: number): Promise<UserEntity> {
        return await this.userRepository.delete(id);
    };

    async update(properties: UserProperties, id: number): Promise<UserEntity> {
        return await this.userRepository.update(properties, id);
    };

}


export {UserService};