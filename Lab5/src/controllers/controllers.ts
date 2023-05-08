import {userService} from "../services/services";
import {UserController} from "./user/user.controller";
import {userValidator} from "../entity/user/user-validator";

const userController = new UserController(userService, userValidator);

export {userController, UserController}