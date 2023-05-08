"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.userService = void 0;
const user_service_1 = require("./user/user.service");
Object.defineProperty(exports, "UserService", { enumerable: true, get: function () { return user_service_1.UserService; } });
const repositories_1 = require("../repositories/repositories");
const userService = new user_service_1.UserService(repositories_1.userRepository);
exports.userService = userService;
