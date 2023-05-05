import {userService, UserService} from "../services/user.service";

class UserController{
    private readonly userService:UserService;

    constructor(userService: UserService) {
        this.userService = userService;
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


const userController = new UserController(userService);


export {userController, UserController};