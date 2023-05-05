"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.userController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    ;
    get() {
    }
    ;
    getAll() {
    }
    ;
    create() {
    }
    ;
    delete() {
    }
    ;
    update() {
    }
    ;
}
exports.UserController = UserController;
const userController = new UserController(user_service_1.userService);
exports.userController = userController;
