"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.userService = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
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
exports.UserService = UserService;
const userService = new UserService(user_repository_1.userRepository);
exports.userService = userService;
