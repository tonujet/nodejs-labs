import {userRepository, UserRepository} from "../repositories/user.repository";


class UserService {
    private readonly userRepo: UserRepository;

    constructor(userRepo: UserRepository) {
        this.userRepo = userRepo;
    };

    get() {

    };

    getAll() {

    };

    create() {

    };

    delete() {

    };

    update() {

    };

}

const userService = new UserService(userRepository);

export {userService, UserService};