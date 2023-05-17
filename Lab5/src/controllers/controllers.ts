import {userService} from "../services/services.js";
import {UserController} from "./user/user.controller.js";
import {userValidator} from "../entity/user/user-validator.js";

const userController = new UserController(userService, userValidator);

export {userController};